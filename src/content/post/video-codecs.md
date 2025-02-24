---
title: "Video Codecs"
description: "What are video codes, their evolution, and how to work with them"
publishDate: "5 August 2024"
tags: ["encoding"]
---

## Introduction

In the digital age, video content is ubiquitous. Whether you're streaming your favorite show, video calling a friend, or watching a YouTube tutorial, video codecs play a crucial role behind the scenes. Let's explore what video codecs are, their evolution, and how you can work with them using **FFmpeg**.

Video encoding is the process of compressing and converting raw video data into a format suitable for storage or transmission. It's a crucial step in digital video processing that balances file size, quality, and compatibility. Let's explore the key concepts and techniques involved in video encoding.

## Fundamental Concepts

1. **Compression**: Video compression reduces the amount of data needed to represent a video sequence. There are two main types:

   - Lossless compression: Preserves all original data, resulting in larger file sizes.
   - Lossy compression: Removes some data to achieve smaller file sizes, potentially reducing quality.

2. **Color Space and Chroma Subsampling**

   - Color spaces like RGB and YUV represent colors in video.
   - Chroma subsampling (e.g., 4:2:0, 4:2:2) reduces color information to save bandwidth, exploiting the human eye's lower sensitivity to color details.

3. **Frame Types**

   - I-frames (Intra-coded frames): Complete images, independent of other frames.
   - P-frames (Predicted frames): Contain only changes from previous frames.
   - B-frames (Bi-directional predicted frames): Can reference both past and future frames.

4. **Bitrate:** Bitrate is the amount of data processed per unit of time. Two main approaches:

- Constant Bitrate (CBR): Maintains a consistent data rate.
- Variable Bitrate (VBR): Allows bitrate to fluctuate based on scene complexity.

## Encoding Techniques

1. **Motion Estimation and Compensation:** This technique predicts movement between frames to reduce redundant information:

   - Block matching: Divides frames into blocks and searches for matching blocks in reference frames.
   - Optical flow: Estimates motion vectors for each pixel.

2. **Transform Coding:** Converts spatial domain data to frequency domain:

   - Discrete Cosine Transform (DCT): Commonly used in many codecs.
   - Wavelet Transform: Used in some modern codecs for better compression at low bitrates.

3. **Quantization:** Reduces the precision of the transform coefficients:

   - Coarser quantization leads to more compression but lower quality.
   - Finer quantization preserves more detail but results in larger file sizes.

4. **Entropy Coding: ** Lossless compression stage applied to the quantized data:
   - Huffman coding: Assigns shorter codes to more frequent symbols.
   - Arithmetic coding: Encodes entire messages into a single number.

## Other Encoding Concepts

1. **Rate Control:** Manages bitrate to meet target file size or streaming requirements:

   - One-pass encoding: Makes decisions in real-time.
   - Two-pass encoding: Analyzes the entire video in the first pass to optimize the second pass.

2. **Adaptive Bitrate Streaming:** Adjusts video quality based on the viewer's network conditions:

   - Creates multiple versions of a video at different bitrates.
   - Client-side player switches between versions as needed.

3. **Psychovisual Optimization:** Exploits characteristics of human visual perception:

   - Allocates more bits to areas where the human eye is more sensitive to distortion.
   - Reduces bits in areas where distortion is less noticeable.

4. **Parallel Processing:** Utilizes multi-core CPUs or GPUs to speed up encoding:
   - Slice-based parallelism: Divides frames into slices that can be processed independently.
   - Frame-based parallelism: Processes multiple frames simultaneously.

## What are Video Codecs?

A codec, short for "coder-decoder," is a piece of software that compresses (encodes) and decompresses (decodes) digital video. The primary goal of a video codec is to reduce the size of video files while maintaining acceptable quality. This compression is essential for efficient storage and transmission of video data.

## The Evolution of Video Codecs

Video codec technology has come a long way since the early days of digital video. These tools that have shaped our digital media landscape.

Our story begins in the late 1980s. The digital revolution was in its infancy, and the need for efficient video compression was becoming apparent. In 1988, **H.261** emerged as one of the pioneers, designed primarily for videoconferencing over ISDN lines. While rudimentary by today's standards, it laid the groundwork for future innovations.

As we entered the 1990s, the world was changing rapidly. The internet was taking its first steps into mainstream consciousness, and multimedia was becoming a buzzword. In 1993, **MPEG-1** made its debut. This codec, developed by the Moving Picture Experts Group, was a game-changer. It enabled Video CDs and early internet video, bringing digital video to a wider audience than ever before.

But the world of video wasn't standing still. The mid-90s saw the rise of DVD technology, demanding more sophisticated compression techniques. Enter **MPEG-2** in 1995. This new standard elevated home entertainment, powering DVDs and digital TV broadcasting. For many, this was their first taste of high-quality digital video at home.

As we stepped into the 2000s, the internet was evolving rapidly. Broadband was becoming more common, and online video was no longer a novelty. The year 2003 marked a significant milestone with the introduction of **H.264, also known as MPEG-4 AVC**. This codec represented a huge leap forward, offering much better compression efficiency than its predecessors. It quickly became the go-to choice for streaming platforms, Blu-ray discs, and even some broadcast applications.

But the story doesn't end there. The rise of YouTube and other streaming platforms in the mid-2000s created new challenges and opportunities. Google entered the fray with **VP8** in 2008, which they later open-sourced. This move sparked discussions about open and royalty-free video technologies for the web.

As we entered the 2010s, the world was going HD, and 4K was on the horizon. The demand for more efficient codecs was stronger than ever. In 2013, two significant players entered the scene. **H.265 (HEVC)** arrived, promising about 50% better compression than H.264. In the same year, Google introduced **VP9**, positioning it as a royalty-free alternative to HEVC.

The latest chapter in our story brings us to 2018, with the arrival of **AV1**. Developed by the Alliance for Open Media, AV1 represents a collaborative effort by tech giants to create a powerful, open-source codec. It aims to outperform both HEVC and VP9, _especially for internet streaming_.

As we look to the future, new challenges await. The rise of 8K video, virtual reality, and cloud gaming are pushing codec technology to new limits. The next generation of codecs, like **H.266/VVC** and Google's ongoing work, promise to tackle these challenges head-on.

From the early days of H.261 to the cutting-edge AV1, the evolution of video codecs reflects our ever-growing appetite for high-quality digital video. As we move forward, one thing is certain: the journey of video codec evolution is far from over. Here's a brief timeline of some significant codecs and the various techniques each implements :

1. MPEG-1 (1993): Used for Video CDs, early internet video.
2. MPEG-2 (1995): Used for DVDs, digital TV broadcasting.
3. H.264/AVC (2003): Widely used for streaming, Blu-ray discs, and more.
   - Flexible macroblock ordering
   - Multiple reference frames
   - Deblocking filter
4. VP8 (2008): Open-source codec developed by On2 Technologies, later acquired by Google.
5. H.265/HEVC (2013): Offers improved compression over H.264.
   - Larger coding tree units (up to 64x64 pixels)
   - Improved intra-prediction
   - Sample Adaptive Offset (SAO) filter
6. VP9 (2013): Google's successor to VP8, used widely on YouTube.

   - Superblocks (up to 128x128 pixels)
   - Asymmetric Numeral Systems (ANS) entropy coding
   - Compound Inter-Prediction

7. AV1 (2018): Open-source codec developed by the Alliance for Open Media.
   - Superblocks (up to 128x128 pixels)
   - Asymmetric Numeral Systems (ANS) entropy coding
   - Compound Inter-Prediction

## A Brief History of FFmpeg

FFmpeg is a free and open-source software project that delivers libraries and tools for multimedia data handling. Initially developed by Fabrice Bellard in 2000, it has become a crucial resource for digital video processing. Its remarkable popularity in the video community is such that it could be seen as a cult favorite. The latest version, Ffmpeg 4.0, was released in 2018 and brought with it support for AV1

FFmpeg has become the backbone of many video processing applications and services due to its versatility and powerful features.

## How to Change Video Codecs Using FFmpeg

Changing video codecs with FFmpeg is a straightforward process. Here are some example commands for converting to different codecs:

1. Converting to H.264:

   ```
   ffmpeg -i input.mp4 -c:v libx264 -crf 23 -c:a aac -b:a 128k output.mp4
   ```

2. Converting to H.265/HEVC:

   ```
   ffmpeg -i input.mp4 -c:v libx265 -crf 28 -c:a aac -b:a 128k output.mp4
   ```

3. Converting to VP9:

   ```
   ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -b:a 128k -c:a libopus output.webm
   ```

4. Converting to AV1:
   ```
   ffmpeg -i input.mp4 -c:v libaom-av1 -crf 30 -b:v 0 -strict experimental -c:a libopus output.mkv
   ```

In these commands:

- `-i input.mp4` specifies the input file.
- `-c:v` sets the video codec.
- `-crf` sets the Constant Rate Factor for quality control (lower values mean higher quality).
- `-c:a` sets the audio codec (`aac` or `libopus`)
- `-b:a` sets the audio bitrate.

Remember to adjust the input and output filenames and paths as needed.

## Conclusion

Video codecs continue to evolve, offering better compression and quality. While older codecs like H.264 remain widely used due to their broad support, newer codecs like AV1 promise even better performance. Tools like FFmpeg make it possible for anyone to work with these codecs, enabling a wide range of video processing tasks.

As video content continues to dominate the internet, understanding codecs and how to use them becomes increasingly valuable for content creators, developers, and tech enthusiasts alike.
