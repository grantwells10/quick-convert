# Chrome Extension Idea: MelodyCraft

## Authors

James Huang, Roberto Ligeralde, Franci Branda-Chen, John Otto

## Problem Statement

Intermediate musicians often spend more time grappling with music production software and getting instruments and quantizing their recordings than making music. If you want to get into music production, why waste time looking for expensive presets and quantizing notes when AI could produce a recording specific to your track? Spend less time and less costs, and spend more time creating.

## Target Audience

The target audience for MelodyCraft includes:

Music producers, all the way from beginning musicians who need more help with making music to industry professionals who would like to streamline their workflow, automate tedious tasks, and save money on one-time plugins.

## Description

The core functionality of the extension is to allow users to hum melodies or tap rhythms, which the AI then analyzes to produce quantized instrument lines tailored to the user's specifications. This process includes timbre transfer, allowing users to experiment with how their vocal lines would sound on different instruments without the need for the actual instrument or a player. Additionally, the tool offers automated quantization and the application of various effects (reverb, chorus, pedal plugins) to enhance the audio recordings, making the music production process more efficient and cost-effective, and gives musicians more time to be creative rather than worry about the technicalities.

## Selling Points

1. Machine-learning based timbre transfers allows for quick idea proliferation to streamline your workflow. Wondering how your vocal line might sound on violin? No need to wait for a violinist! 
2. Machine-learning based quantization sounds much better than DAWs because it recreates the rest of the track instead of crunching to force it into line.
3. Our software actually works for trills and glissandos, and detects them. Plus, selective window for where quantization is needed for cross attention.
4. Our input takes voice, tapping, and instruments so it’s very flexible.
5. No need to waste money on expensive reverb, chorus, or pedal plugins just to make a single track sound right. Our plugin automatically tailors these effects specifically to your audio recording based on the prompt you request (e.g. “Hall reverb,” “Aquatic pedal”, etc.)
6. Quantization is automated for you. Never waste time stretching and squashing your audio file to be on beat again!
7. Our software is compatible with all major audio files (AIFF, TIFF, WAV, MP3, etc.) and MIDI files so it’s instantly compatible with your workspace. Have an idea? Just hit our plugin, hum, and add any other parameters for how you want it to sound.
8. Create and save synthesizer presets without knowing any of the technicals of modular synthesis! Convert your prompt into a savable Ableton Max for Live synthesizer instrument. 
9. Automatic pitch detection and correction too. Just let us know what scale you’re in. (Advanced Feature). Software returns notes that might be off-pitch or off-rhythm.
10. Automatically save portfolios of your idea and section it off into different folders for different songs! Integration with TikTok, Youtube Shorts, Instagram Reels uploads too.

## User Stories

1. As an experienced music producer, I want to turn my ideas into final products without spending lots of money on plugins and time on quantizing my recordings.
2. As a composer but an inexperienced recording artist, I want to save time quantizing my notes and spend more time producing rather than recording my music.
3. As someone who likes writing music but does not like music theory, I want to spend more time playing music than making sure that all my notes are written in the write format.
4. As a classical musician, I want to perform quantization which accounts for best practices in my compositional style.
5. As a music teacher, I want to be able to quantize my students’ work to let them hear how different being on beat would sound without to re-record every track for them.
6. As an electronic musician, I want to be able to create and share my own presets and instruments quickly without spending hours or hundreds of dollars on software like Serum.
7. As a beginning music producer, I want to be able to detect what key my recordings are in and get help auto-tuning my tracks.
8. As a user with multiple projects, I want the extension to support organizing and managing rhythmic ideas into separate folders or playlists.
9. As a content creator on social media, I want the extension to provide options for exporting rhythmic ideas as video or audio clips for sharing online.
10. As a session musician, I want to come up with many variations one idea to find out what my client wants.
11. As someone without a dedicated professional recording space, I would like to make clear recordings that separate background noise from my music.
12. As a session musician, I want to have a portfolio of the ideas that I’ve come up with.


## Notes

1. Quantizing all outputs would be easy to implement for simple rhythms. It might be a bit harder for jazz/other genres full of polyrhythms so we might want to include the option for adjusting the swing or pattern of the recording. But it would have to be better than Ableton’s shitty quantization grid! (This would be solved with cross-attention)
2. Huge opportunity for timbre transfer and producing quantized recordings of musicians ideas. Lots of people could definitely use this if done well.
3. No idea how good machine learning models are at quantization. How costly would it be to link a chrome extension to a ML API too? Would we have to train our own? 
4. It would be difficult to integrate the chrome extension into the music production workflow itself since it would be a chrome extension and not a DAW like Ableton.
5. How could we train a dataset broad enough that it encompasses all likely genres that users will want, and do it well? Where to get training data?
6. API integration with music production software and music teaching software would be fun.
7. How to manage token limits?

## References & Inspiration

https://chromewebstore.google.com/detail/transpose-%E2%96%B2%E2%96%BC-pitch-%E2%96%B9-spee/ioimlbgefgadofblnajllknopjboejda (Proof that we can integrate audio files into a chrome extension, even though this software pulls audio from Youtube API)

https://github.com/magenta/ddsp 

https://colab.research.google.com/github/magenta/ddsp/blob/main/ddsp/colab/demos/timbre_transfer.ipynb 
