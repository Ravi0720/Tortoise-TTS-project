const form = document.getElementById('tts-form');
const audio = document.getElementById('audio');
const canvas = document.getElementById('wave');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(canvas.clientWidth, canvas.clientHeight);
camera.position.z = 5;

const geometry = new THREE.BufferGeometry();
const points = new Float32Array(100 * 3);
const material = new THREE.LineBasicMaterial({ color: 0x00ffff });
const line = new THREE.Line(geometry, material);
scene.add(line);

function animateWave(data) {
    for (let i = 0; i < 100; i++) {
        points[i * 3 + 1] = data[i % data.length] * 0.01;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(points, 3));
    renderer.render(scene, camera);
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = document.getElementById('text').value;
    const voice = document.getElementById('voice').value;
    const speed = document.getElementById('speed').value;

    try {
        const response = await fetch('/generate', {
            method: 'POST',
            body: new URLSearchParams({ text, voice, speed })
        });
        if (!response.ok) throw new Error('Failed to generate speech');
        const blob = await response.blob();
        audio.src = URL.createObjectURL(blob);
        audio.play();

        // Simulate waveform (random for demo)
        const fakeWave = new Array(100).fill(0).map(() => Math.random() * 100);
        animateWave(fakeWave);
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to generate speech. Check console.');
    }
});