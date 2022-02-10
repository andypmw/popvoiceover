import React from 'react';

export default class extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      track: false,
      latestDrawnUrl: ''
    };

    this.playPauseAudio = this.playPauseAudio.bind(this);
    this.visualizeAudio = this.visualizeAudio.bind(this);
  }

  componentDidMount() {
    const audioCtx = window.AudioContext || window.webkitAudioContext;

    if (audioCtx) {
      this.audioCtx = new audioCtx();
      this.gainNode = this.audioCtx.createGain();
    } else {
      console.error("This browser doesn't support the web audio API.");
    }
  }

  playPauseAudio(e) {
    const audioElement = document.querySelector('.audio-file');

    if (! this.state.track) {
      this.track = this.audioCtx.createMediaElementSource(audioElement);
      this.setState({ track: true });
    }

    this.track.connect(this.gainNode).connect(this.audioCtx.destination);

    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    audioElement.play();    
  }

  visualizeAudio() {
    const visualizeAudio = url => {
      fetch(url)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => this.audioCtx.decodeAudioData(arrayBuffer))
        .then(audioBuffer => drawAudio(audioBuffer));
    }

    const drawAudio = audioBuffer => {
      draw(normalizeData(filterData(audioBuffer)));
    }

    const filterData = audioBuffer => {
      const rawData = audioBuffer.getChannelData(0);
      const samples = 70;
      const blockSize = Math.floor(rawData.length / samples);
      const filteredData = [];
      for (let i = 0; i < samples; i++) {
        let blockStart = blockSize * i;
        let sum = 0;
        for (let j = 0; j < blockSize; j++) {
          sum = sum + Math.abs(rawData[blockStart + j]);
        }
        filteredData.push(sum / blockSize);
      }
      return filteredData;
    }

    const normalizeData = filteredData => {
      const multiplier = Math.pow(Math.max(...filteredData), -1);
      return filteredData.map(n => n * multiplier);
    }

    const draw = normalizedData => {
      const canvas = document.querySelector('canvas');
      const dpr = window.devicePixelRatio || 1;
      const padding = 20;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = (canvas.offsetHeight + padding * 2) * dpr;
      const ctx = canvas.getContext('2d');
      ctx.scale(dpr, dpr);
      ctx.translate(0, canvas.offsetHeight / 2 + padding);

      // draw the line segments
      const width = canvas.offsetWidth / normalizedData.length;
      for (let i = 0; i < normalizedData.length; i++) {
        const x = width * i;
        let height = normalizedData[i] * canvas.offsetHeight - padding;
        if (height < 0) {
          height = 0;
        } else if (height > canvas.offsetHeight / 2) {
          height = height > canvas.offsetHeight / 2;
        }
        drawLineSegment(ctx, x, height, width, (i + 1) % 2);
      }
    }

    const drawLineSegment = (ctx, x, y, width, isEven) => {
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#333';
      ctx.beginPath();
      y = isEven? y: -y;
      ctx.moveTo(x, 0);
      ctx.lineTo(x, y);
      ctx.arc(x + width / 2, y, width / 2, Math.PI, 0, isEven);
      ctx.lineTo(x + width, 0);
      ctx.stroke();
    }

    visualizeAudio(this.props.url);
  }

  render() {
    if (this.props.url.length > 0) {
      if (this.props.url != this.state.latestDrawnUrl) {
        // this.visualizeAudio();
      }
    }

    return (
      <div className="w-full md:w-1/2 bg-white border-2 border-slate-300 shadow-lg">
        <div className="py-2 px-5 bg-slate-200">
          <h1 className="text-xl font-medium">
            3 - The Voice
          </h1>
        </div>
        <div className="px-5 py-3">
          <div className="container flex justify-center">
            {this.props.url.length === 0?
              'Please Synthesize any text first'
              : 
              <button
                onClick={this.playPauseAudio}
                className={"py-2 px-5 border-2 border-slate-400 hover:bg-sky-100 active:bg-sky-200"}
              >
                Listen
              </button>
              }
          </div>

          <div className="container flex justify-center">
            { /*<canvas></canvas>*/ }
          </div>

          <audio
            className="audio-file"
            src={this.props.url}
            crossOrigin="anonymous"
            preload="none"
          />
        </div>
      </div>
    );
  }
}
