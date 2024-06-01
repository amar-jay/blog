---
title: "FPGAs"
description: "by Jon Y from Asianoetry"
publishDate: "1 Jun 2024"
---
A Field Programmable Gate Array or FPGA is an integrated circuit that can be reprogrammed after manufacture to emulate a digital circuit.

These are great for prototyping new functionalities before mass production. Or serving rare use cases that aren't economical for a custom chip.

FPGAs aren’t the first with this capability, but they are by far the most commercially successful. And the story of their development is a fascinating mix of technology and business.

For decades, people have searched for ways to make a chip that you can reprogram after manufacturing. In this video, let us explore the industry’s quest for the ultimate flex.

## Beginnings

Way back in the day, if someone wanted to prototype and test their logic function on some actual hardware, then they largely had just two options.

First, they can use TTL chips. These are transistors that you can plug into a printed circuit board. The shortcoming of that approach was that you were limited by the board's size and power consumption limits.

The other option would be to get a chip built to order. As you might expect, there are substantial upfront costs with this choice.

It meant paying for a photomask and then waiting months for fabrication. And if you made a mistake in the design ... well, you can't exactly edit your JS file and re-compile.

Today, these customized chips would be called ASICs or Application-Specific Integrated Circuits. It probably does not make economic sense to take this path unless your use case was quite large.

But what if you could have a circuit that can be reprogrammed to have the functionality you were prototyping? As integrated circuits became more widely adopted after the 1960s, field programmability started to become more of a compelling need.

## PROM

The first integrated circuits capable of implementing a programmable logic function were Programmable Read Only Memories - PROM.

Note for this video. There are going to be a lot of specific phrases in the video. I am going to do my best to keep them straight for you, but yeah this will be hard. 加油!

In 1970 Harris Semiconductor introduced PROMs that can be programmed to implement an array of programmable logic gates - an AND-set and an OR-set.

The inputs first go into the AND-set.

Those outputs then feed into the OR-set, before finally being outputted to the end user.

Why "AND" and "OR" gates? There is a type of logic function called combinational or time-independent logic. Here, the outputs of the function are purely dependent on the inputs you give it. Like a deterministic system.

That is in contrast to sequential logic functions, a type of logic in which the output needs some other external item.

Like a rolling sum. How can you keep a rolling sum, if you can't remember what the previous sum was?

Back to combinational. Any combinational logic function can be expressed by a number of OR and AND gates. So that was what the early field programmable logic circuits targeted.

Harris' PROM product shipped with the AND-gates fixed. Meaning that they could not be modified.

The OR-gates were programmable. To make them programmable, Harris shipped them with fusible metal links made of nichrome rather than the traditional aluminium.

The user programmed by "burning" the switches - essentially making them one-time use only. This made it kind of challenging to program. You can imagine how much pressure there is not to mess up.

Harris did pioneering work in the fabrication of these burnable fuses. They created test fuses on the wafer and blew them during the test process to make sure they worked. It was pretty cool.

As it turns out, using PROM to implement programmable logic was not really efficient because you don't need all those memory cells to do it. You needed something more specialized.

## Programmable Logic Arrays

In 1975, Signetics - later part of NXP Semiconductors - brought out the Programmable Logic Array, or PLA, to the market.

No relation to the People's Liberation Army, the armed branch of the Communist Party of China.

With a PLA, both the AND-set and OR-set of logic gates were made programmable. This allowed users to implement a wider range of logic functions like a minimal sum-of-products, but at a significant cost.

The PLA required a far larger chip, raising the overall cost. Each part back then cost about $25 each in 1975 dollars or about $140 USD today.

And again, you programmed a route by burning the fuse connections so errors were costly. With great flexibility comes great ... uh mistake-ability? Is that a word? Well I just invented it.

Anyway, you can see the market challenge here. Despite their advantages, PLAs never really caught on. The market still needed something to scratch that field programmability itch.

## Programmable Array Logic and MMI

In 1977, engineers John Birkner and H.T. Chua of Monolithic Memories modified the PLA to create a new device:

The Programmable Array Logic, or PAL. Yes, literally just the last two words reversed.

The PLA had been too configurable for its own good. To the point it was more like a puzzle game than a real product.

So the PAL traded away some of that configurability to gain better performance and cost.

It kept the programmable AND-set of gates,

but made the OR-set of logic gates fixed.

Another modification that the PAL design made was the inclusion of sequential logic circuits through the use of macro-cells.

Practical computer circuits use a mix of both combinational logic and sequential logic. So PAL designers added those sequential logic-type devices like flip flops to the PAL output end.

A flip flop is a type of circuit that can store a single bit of information - usually a 1 or 0 - and can use it as part of their output calculations.

Like a light switch remembering whether it has been flipped or not.

Adding these sequential logic circuits made the PAL more practical for every day consumer usage.

And then in the early 1980s, new technologies emerged to make these circuits more reprogrammable. For instance, you can flash ultraviolet light through a window to erase it. No more fuses necessary, which is kind of cool.

These small field programmable devices - PLAs, PALs, and so on - can be categorized as Simple Programmable Logic Devices.

PALs saw some success and were widely made. Memory makers found them similar enough to their core products to add to their repertoire. And Monolithic Memories made it easy for users to learn how to use them.

But PALs nevertheless had a big problem, and new companies soon emerged to challenge their shortcomings.

## Altera

In 1980, a bunch of engineers formerly from Intel, Signetics, and Intersil founded a design consulting company called Source III. They specialized in helping companies work with their silicon suppliers - a big deal back in a day when design tools weren't amazing.

Their experiences working with ASIC chip makers led them to try to make their own field programmable hardware. With that, they raised $750K from a VC and founded a new company - Altera.

Their first product, released in July 1984, was the EP300 - a simple programmable logic device made with a CMOS EPROM process. It was erasable and could be programmed to meet a variety of needs.

The big problem with the PAL was that its structure didn't scale. Moore's Law allowed more transistors on the die, but you cannot simply grow the AND-set of gates and get proportionally better performance. It got too large and started slowing down. More on why later.

So in order to better take advantage of classical shrinking, Altera pioneered the Complex Programmable Logic Device. Here, we take a bunch of smaller PALs and connect them with crossbar connections to be much more scalable.

Altera's choice to use CMOS was also impactful. CMOS was not available in the United States at the time, and the company had to go to Ricoh in Japan for it.

Altera's successes heralded the beginning of the fabless design model that today drives America's semiconductor world.

## Xilinx

Altera's Complex Programmable Logic Device was a step forward. But it was another company that took the concept to what we have today.

In the mid-1980s, an engineer at the American semiconductor manufacturer Zilog named Ross Freeman had an idea. More like a dream. People have said that his early ideas came from dreams.

If Moore's Law continued, then eventually transistors will get so cheap that it would be possible to make a piece of silicon that met everyone's needs.

He recruited a number of Zilog coworkers to join him in his new startup and help realize this dream. They named it Xilinx after their original name Logica had already been taken and officially opened in February 1984.

They leveraged a previous connection to Seiko Corporation - yes, the digital watch maker - and struck a deal to produce their new chip. They pitched it as a way for Seiko to keep their fabs busy, and offered exclusive resale rights in Japan.

To actually design the product, Xilinx hired a young designer named Bill Carter. Carter had a massive challenge ahead of him.

The only design guidance they had was the Ross Freeman patent application, a loose description of the idea.

Furthermore, Seiko fabbed using a CMOS 2.5 micrometer process, in which Carter had no prior experience. He had to learn it on the fly while communicating with a Japanese-speaking fab across the Pacific.

Furthermore, this chip was going to have to be very big. Seiko's own engineers admitted that they had never made anything that big before, and raised the risk that this thing would not yield. Such a thing would be a disaster for a young startup.

Carter was repeatedly told to create something simple. Don't try anything crazy because they might not be able to fab it. Make it simple and just get it out. And what they made was indeed elegant in its simplicity.

The Xilinx XC2064, the first FPGA.

## The FPGA Emerges

So if we go back to the PAL, there is a set of AND-gates and a set of OR-gates plus a macro-cell of other circuits like the aforementioned flip flop.

The AND-gates are where the chip's field programmability comes from.

So as I said earlier, the core problem with the PAL's architecture was that if the AND-set of gates got bigger, then it got slower.

That is because the number of transistors inside the set are growing much faster than the number of inputs/outputs on the sides of the AND-set. Those inputs/outputs cannot grow as fast.

The FPGA's solution to this shortcoming was to remove the AND-set of gates altogether.

In its stead, the FPGA would have an array of configurable logic blocks connected together with programmable switches.

Device inputs and outputs were placed all around the device.

Inside each configurable logic block was a pair of look up tables - which is basically like an array of outputs mapped to the inputs.

This lookup table is how the FPGA can implement arbitrary logic functions.

If necessary, the function result can then be routed to other logics like flip-flops.

The interconnects themselves between the logic blocks are themselves programmable. Connections can be configured to create arbitrary paths so that the output of one block can become the input of its neighbor block.

The first Xilinx FPGAs required users to attach external memory to store the programming when the power was off. It was not until a few years later that a company called Actel invented antifuse technology that helped with this.

All of this was a radical change from what came before. PALs and PLAs descended from memory chips, and their structures have a family resemblance. The FPGA on the other hand looked totally different from that.

## The First FPGA

The XC2064 was a big chip with some 85,000 transistors arranged into 64 configurable logic blocks and 58 input/output blocks. This translated to less than 1,000 gates, which isn't all that impressive today.

Yet back in 1985 when the chip was first taped out, its sheer size strained Seiko's ability to make it. Carter and his team anxiously waited to receive the first box of 25 wafers from Seiko.

They opened the boxes and hoped to be able to program the chips with something. Out of those 25 wafers, only 1 worked - the 11th. Very carefully, Carter took that last wafer and managed to program in an inverter. It worked, and so came about the first FPGA.

## FPGAs versus PAL

The device competed against Monolithic Memories' PAL devices, and most customers lumped the two together. They seemed to do the same things, but underneath that the FPGA was far different from the PAL.

First, it cost a whole lot more. That was directly because the die was so large, resulting in extremely low yields. Thus the first FPGA cost hundreds of dollars while PALs were far cheaper.

The PAL was so much cheaper in part because its structure was similar to memory. So similar that memory makers added them to their product lineup, churning them out whenever the memory business got difficult.

Second, the newness of the FPGA made it far harder to use. Xilinx introduced their own Electronic Design Automation or EDA software to help fit a design into a FPGA. It was complicated and hard to use. Furthermore, its performance was not easy to predict beforehand.

Meanwhile, PALs were far easier to understand. Their EDA software was simple and widely available through third parties, and users found it easy to pick them up.

This EDA perk was extremely consumer friendly, but it turned out to be a long-term detriment to the PAL industry. As we will talk about a little bit later.

## Moore's Law

Yet despite all of these early shortcomings and disadvantages, that first FPGA took hold in the market and eventually thrived. How did the FPGA become a viable competitor?

First, we have to talk about Moore's Law. The FPGA launched at a fortuitous time - an intersection of technology and business opportunity.

On the technology side, maturing lithography technologies ramped up classical scaling to incredible speeds. Like I said, FPGAs can scale while PALs cannot. So when transistor costs crashed, FPGAs were first in line to benefit from that.

Transistors need to be connected. So just as crucially, a new process called chemical-mechanical polishing allowed foundries to drastically lower the costs of making the FPGA's interconnects.

Suddenly FPGAs started to grow their lookup table counts and interconnect wire lengths exponentially. The first FPGA was slow and limited, but Moore's Law helped make it faster and more powerful.

That is the technology side. On the business opportunity side, the early 1990s saw the rise of independent foundries. Altera and Xilinx were early pioneers in the fabless startup model.

Suddenly, any group of design guys can come up with an idea, raise money, and approach a foundry to fab it. No need to first get really good at semiconductor manufacturing.

Foundries for their part can focus on working out the kinks that plagued Seiko in those early days. They found that FPGAs - with their big dies - were really good for honing and mastering their processes.

The FPGA market blossomed with a variety of brand new FPGA startups. Almost all of these startups eventually closed their doors or exited the FPGA business, but they introduced optimizations and discovered new features. Xilinx and Altera would then absorb their IP and patents, adding them to their current lineup.

## EDA

Another big differentiation was software. As I mentioned before, the PAL EDA software was easier to use, and was widely available through third party vendors.

This consumer friendly situation however, had a dark side. The PAL manufacturers did not control the software, and so did not have agency over what their hardware was capable of. It was all up to their third-party EDA vendors.

PAL makers soon realized that they could only do what their EDA software makers were capable of supporting - and it limited them.

All of the PAL makers ended up making similar hardware, like cheap Wintel PC makers. The market crashed to the lowest bottom denominator.

Meanwhile FPGAs controlled their own EDA. Like Nvidia writing their own drivers, it allowed the FPGA companies to dictate their future - crafting software to enable more features and adding automation for more productivity.

## Conclusion

Xilinx and Altera continue to hold majority share of the multi-billion dollar FPGA industry. Though the two companies are no longer independent.

Intel acquired Altera all the way back in 2015 for about $16.7 billion.

And AMD acquired Xilinx for an estimated $50 billion - which finally closed in 2022.

Today FPGAs are widely used across a variety of industries. As ASICs get increasingly expensive to design and fab, FPGAs have filled a valuable gap in the market especially in the aerospace, military, and telecom spaces.

And they continue to gain new functionalities, growing into areas like AI processing and the data center. Challenges remain along the way - and we will talk about them in future videos - but the FPGA's Swiss Army knife functionality and success is a unique Silicon Valley story. And a reflection of the industry’s innovative powers.
