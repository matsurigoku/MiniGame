self.AudioContext = (self.AudioContext || self.webkitAudioContext);
async function alien1Transform(audioBuffer) {

  let ctx = new OfflineAudioContext(audioBuffer.numberOfChannels, audioBuffer.length, audioBuffer.sampleRate);

  let source = ctx.createBufferSource();
  source.buffer = audioBuffer;

  let oscillator = ctx.createOscillator();
  oscillator.frequency.value = 5;
  oscillator.type = 'sine';

  let oscillatorGain = ctx.createGain();
  oscillatorGain.gain.value = 0.05;

  let delay = ctx.createDelay();
  delay.delayTime.value = 0.05;

  // source --> delay --> ctx.destination
  // oscillator --> oscillatorGain --> delay.delayTime --> ctx.destination

  source.connect(delay);
  delay.connect(ctx.destination);

  oscillator.connect(oscillatorGain);
  oscillatorGain.connect(delay.delayTime);

  oscillator.start();
  source.start();

  let outputAudioBuffer = await ctx.startRendering();
  return outputAudioBuffer;

}
