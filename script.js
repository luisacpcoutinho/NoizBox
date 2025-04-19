document.addEventListener('DOMContentLoaded', () => {
    const recordButton = document.getElementById('recordButton');
    const audioPlayer = document.getElementById('audioPlayer');
    let mediaRecorder;
    let audioChunks = [];

    // Request microphone access and set up recording
    async function setupRecording() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.ondataavailable = (event) => {
                audioChunks.push(event.data);
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(audioBlob);
                audioPlayer.src = audioUrl;
                audioPlayer.style.display = 'block';
                audioPlayer.play();
            };
        } catch (error) {
            console.error('Error accessing microphone:', error);
            alert('Error accessing microphone. Please ensure you have granted microphone permissions.');
        }
    }

    // Set up event listeners for the record button
    recordButton.addEventListener('mousedown', () => {
        audioChunks = [];
        mediaRecorder.start();
        recordButton.textContent = 'Recording...';
        recordButton.style.backgroundColor = '#ff2222';
    });

    recordButton.addEventListener('mouseup', () => {
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
            recordButton.textContent = 'Hold to Record';
            recordButton.style.backgroundColor = '#ff4444';
        }
    });

    recordButton.addEventListener('mouseleave', () => {
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
            recordButton.textContent = 'Hold to Record';
            recordButton.style.backgroundColor = '#ff4444';
        }
    });

    // Initialize recording setup
    setupRecording();
}); 