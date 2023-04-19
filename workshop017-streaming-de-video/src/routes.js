const { Router } = require('express');
const fs = require('fs');
const path = require('path');

const router = Router();

router.get('/watch/:videoName', (req, res) => {
    const videoName = req.params.videoName;
    const page = fs.readFileSync(path.join(__dirname, '..', 'public', 'watch.html'), 'utf-8').replace('{{videoUrl}}', `/stream/${videoName}`);
    res.send(page);
})

router.get('/stream/:videoName', (req, res) => {
    const videoName = req.params.videoName;
    const videoPath = path.join(__dirname, '..', 'storage', videoName);

    if (!fs.existsSync(videoPath)) {
        return res.status(404).send('Video not found');
    }

    const range = req.headers.range;
    const start = Number(range.replace('bytes=', '').split('-')[0]);
    const end = start + 1e6;

    const videoSize = fs.statSync(videoPath).size;

    res.status(206).set({
        'Content-Range': `bytes ${start}-${end}/${videoSize}`,
        'Content-Length': end - start + 1,
        'Content-Type': 'video/mp4'
    });

    fs.createReadStream(videoPath, { start, end }).pipe(res)
})

module.exports = router
