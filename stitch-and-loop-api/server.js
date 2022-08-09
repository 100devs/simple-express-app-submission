const express = require('express')
const cors = require('cors')
const app = express()

const PORT = 8000;


app.use(cors())
app.use(express.json())



const stitches = [
    {
        'type':'stitch',
        'name':'Crochet Chain Stitch',
        'instructions':'The crochet chain stitch is made by doing a “yarn over” and “pull through”. Keep repeating this to keep growing the chain. This is used to create the foundation chain that is used at the beginning of may different crochet projects. It is also used to create the turning chain that is used to begin new rows / rounds of crochet. In rare instances the crochet chain stitch may be used as a design detail on a more advanced crochet pattern.',
        'photo':'',
    },
    {
        'type':'stitch',
        'name':'Crochet Slip Stitch',
        'instructions':'The crochet slip stitch is made by inserting the hook into a stitch, doing a “yarn over” and then doing a “pull through” both of the loops that are on the hook. This creates a very short stitch. It is most commonly used to join together stitches when working in the round, allowing you to close the circle on that round. However, it can also be worked across the row; this is often seen when using slip stitch as a crochet edging or when using slip stitch to join two motifs together in crochet. It is difficult to work multiple rows of slip stitch crochet into each other but it can be done. Slip stitches are also used in surface crochet, which is a type of embroidery added on to crochet fabric.',
        'photo':'',
    },
    {
        'type':'crochet',
        'name':'Single Crochet',
        'instructions':'Single crochet is created when you insert the hook into a stitch, yarn over and pull through, yarn over again and pull through both loops on the hook. (You\'ll notice that this is similar to crochet slip stitch but includes an extra yarn over which adds height.)',
        'photo':'',
    },
    {
        'type':'stitch',
        'name':'Half Double Crochet',
        'instructions':'In half double crochet, you yarn over first then insert the hook into the stitch, yarn over and pull through, yarn over again and pull through all three loops on the hook. (The extra loop in comparison to single crochet is created because you did an extra yarn over at the beginning of the stitch.)',
        'photo':'',
    },
    {
        'type':'stitch',
        'name':'Treble Crochet',
        'instructions':'In treble crochet, you yarn over twice before inserting the hook into the stitch, then you yarn over and pull through, yarn over and pull through the first two loops on the hook, yarn over and pull through the next two loops on the hook, then yarn over and pull through the remaining two loops on the hook. You will notice that this is almost the same as the double crochet stitches, except that you have an extra yarn over at the beginning, which creates an extra “yarn over and pull through two loops” at the end, and this adds height in comparison to the double crochet.',
        'photo':'',
    },
    {
        'type':'stitch',
        'name':'Taller "Basic" Crochet Stitches',
        'instructions':"You can continue the same pattern that increased a “double crochet” to a “treble crochet”(add additional yarn overs at the beginning, which adds additional 'pull through two loops' at the end) to create taller and taller crochet stitches. You can make them as tall as you want, expanding on the basic crochet stitch. You don't see these stitches as often, but they do occur, especially the double treble crochet (begins with three yarn overs) and the triple treble crochet (four yarn overs). The next few would be the quadruple treble (five yarn overs to begin) and the quintuple treble crochet stitch.",
        'photo':'',
    },
    {
        'type':'stitch',
        'name':'Crochet Bobble Stitch',
        'instructions':'Bobble stitch is created when you work a group of stitches into the same stitch, joining them at the top and the bottom. This is done by beginning each stitch, but not quite finishing it before starting the next stitch, then finishing them all together at the end. You can make bobble stitches in different heights (single crochet bobbles, double crochet bobbles, for example) as well as in different widths (5 dc bobbles vs 7 dc bobbles, for example).',
        'photo':'',
    },
    {
        'type':'stitch',
        'name':'Crochet Puff Stitch',
        'instructions':'The crochet puff stitch is a variation on the bobble stitch. It is smaller and narrower. There are a few different variations out there but commonly this would be a bobble created using 3 dc or 3 hdc stitches joined at the top in the manner of a bobble stitch.',
        'photo':'',
    },
    {
        'type':'stitch',
        'name':'Crochet Popcorn Stitch',
        'instructions':'Like the bobble and the puff stitch, the popcorn stitch is created when you work a group of crochet stitches into the same stitch and join them at the top. The difference is that with popcorn stitch, you will complete each of the stitches and then use a unique method to make the join at the top. So, for example, you will make 5 dc into the same stitch, then you will remove the hook from the last stitch, insert it into the first stitch, re-insert it into the last stitch and slip stitch them together to make the join. The result is similar to a crochet bobble with just a slight variation in the texture or protrusion of the stitch. As with bobbles, popcorn stitch can be made in different heights and widths.',
        'photo':'',
    },
    {
        'type':'stitch',
        'name':'Crochet Post Stitches',
        'instructions':'Crochet post stitches are stitches that are worked around the post of the stitch below rather than into the loops of the stitch below. Front post crochet stitches are worked around the front of the post; back post crochet stitches are worked around the back. The name of the specific stitch depends on the height of the stitch and its placement, so if you work a double crochet stitch around the front of the post then you\'ll have a front post double crochet. If you work a treble crochet stitch around the back of the post then you create a back post treble crochet. Crochet post stitches are used in basketweave crochet and crochet cables, among other stitch patterns.',
        'photo':'',
    },
    {
        'type':'stitch',
        'name':'Crochet Bullion Stitch',
        'instructions':'The bullion stitch is a fun, highly textured crochet stitch that takes a little bit of practice because it\'s hard to get the tension right to get the stitch to come out well. Basically, you wrap the yarn around the hook (make many “yarn overs”) then insert the hook into the stitch, yarn over and pull through all of the various wraps that are on the hook. You can make a bullion with as little as three yarn overs or as many as ten or more, although commonly they are with with 5-9 “wraps”.',
        'photo':'',
    },
    {
        'type':'stitch',
        'name':'Crochet Cluster Stitch',
        'instructions':'The cluster stitch is sometimes considered a textured crochet stitch because it can have a bit of the “puff” of a popcorn or a bullion depending on how it is made. The primary difference is that a cluster is created across multiple stitches rather than worked into one stitch. So, for example, a 3 dc cluster would consist of three double crochet stitches, each worked into consecutive stitches from the row below, then joined at the top. This effectively turns three stitches into one, making it a form of decreasing in crochet as well as a specific stitch type.',
        'photo':'',
    },
    {
        'type':'stitch',
        'name':'One Loop Crochet Stitches',
        'instructions':'Whereas crochet post stitches are worked around the posts, most stitches are worked through the loops. However, you don\'t have to work everything through both loops (which is the common way of doing it). You can work through the front loop only or the back loop only to completely change the look of a stitch. In half double crochet, you can even work through the third loop only to create a knit-like fabric. The stitch is named by its height and its placement (for example, front loop only double crochet or back loop only single crochet).',
        'photo':'',
    },
    {
        'type':'stitch',
        'name':'Crochet Shell Stitch',
        'instructions':'The crochet shell stitch is an extremely popular crochet stitch that has many, many, many variations. There are typically whole chapters dedicated to crochet shell stitches in stitch dictionaries. Basically, though, the shell stitch is often created by working a set of stitches into the same stitch - enough stitches so that they fan out and create a “shell” shape, a shape often then exaggerated by working short stitches, such as single crochet stitches, into the stitch before and after the shell. For example, you might work a single crochet, then work five double crochet into the next stitch, then work a single crochet into the next stitch; this creates a 5 dc shell. Variations include not only height (half double crochet shells) and width (7 dc shells) but also sometimes working multiple stitch heights in one stitch (sc, hdc, dc, hdc, sc all in the same stitch) or across multiple stitches (that same pattern with each stitch in its own stitch, repeating across a row.) Whenever you see a shell stitch in a crochet pattern, make sure that you read the crochet designer\'s instructions to see what form of the stitch that they are using (which is good advice for any advanced crochet stitch).',
        'photo':'',
    },
    {
        'type':'stitch',
        'name':'Crochet V-Stitch',
        'instructions':'The crochet v-stitch is a very popular crochet stitch. Typically it is worked by making 1 dc, 1 ch, 1 dc all in the same space (creating what looks like a v because there are two double crochets that are together at the bottom but separated by a chain at the top). Variations including adding an additional chain (1 dc, ch 2, 1 dc) as well as changing height (using treble crochet instead of double crochet for example) or changing width (2 dc, ch 1, 2 dc).',
        'photo':'',
    },
    {
        'type':'stitch',
        'name':'Crossed Crochet Stitches',
        'instructions':'Crossed stitches are created when you skip a stitch, work a stitch, then cross back over and work a stitch into the space that you skipped. For example, in a crossed double crochet, you skip one, double crochet in the next, then double crochet in the skipped stitch. Sometimes you will skip more than one stitch before working back. Crossed crochet stitches are often used when creating crochet cable patterns.',
        'photo':'',
    },
    {
        'type':'pattern',
        'name':'Crochet Seed Stitch',
        'instructions':'As explained, crochet seed stitch is sc, dc alternated across a row. In the next row, the sc will be worked into a dc from the row below and vice versa. You can also do a variation on this stitch called the extended seed stitch, in which you work hdc and treble crochet stitches instead of sc, dc.',
        'photo':'',
    },
    {
        'type':'pattern',
        'name':'Crochet Moss Stitch',
        'instructions':'The crochet moss stitch, also sometimes called the crochet granite stitch as well as the linen stitch, is similar to the seed stitch except that instead of alternating single crochet and double crochet you are alternating single crochet and chain stitch. Single crochet stitches are worked into the chain stitches of the row below.',
        'photo':'',
    },
    {
        'type':'pattern',
        'name':'Crochet Wattle Stitch',
        'instructions':'The crochet wattle stitch is worked by making 1 sc, ch 1, 1 dc all in the same stitch, skipping two chains and repeating all of this across a row. In the next row, you\'ll work the 1 sc, ch 1, 1 dc into the chain spaces of the previous row.',
        'photo':'',
    },
    {
        'type':'pattern',
        'name':'Crochet Daisy Stitch',
        'instructions':'This crochet stitch, also sometimes called crochet star stitch, is worked by joining a set of stitches together, then working the next group into the join.',
        'photo':'',
    },
    {
        'type':'pattern',
        'name':'Crochet Seed Stitch',
        'instructions':'As explained, crochet seed stitch is sc, dc alternated across a row. In the next row, the sc will be worked into a dc from the row below and vice versa. You can also do a variation on this stitch called the extended seed stitch, in which you work hdc and treble crochet stitches instead of sc, dc.',
        'photo':'',
    },
    {
        'type':'pattern',
        'name':'Crochet Wave Stitch',
        'instructions':'As with many of the advanced crochet techniques, the crochet wave stitch can be made in many different ways. Basically, though, what you are doing is working a set of short stitches followed by a set of taller stitches and then repeating that across the row to create an undulating design, an effect that is heightened when you work the rows in different colors.',
        'photo':'',
    },
    {
        'type':'pattern',
        'name':'Crochet Cable Stitch',
        'instructions':'There are many varied ways to crochet cables, and it can take entire books or classes to learn them. Typically, though, crochet cables are worked using crossed stitches and often post stitches. The idea is to have textured crochet stitches that cross over one another in a specific pattern that creates a raised design that looks similar to cables in knitting.',
        'photo':'',
    },
    {
        'type':'techniques',
        'name':'Tapestry Crochet',
        'instructions':'Crochet is typically done with yarn or thread. However, you can crochet with a whole range of alternative materials from plastic to glass. Wire crochet is most commonly used to create crochet jewelry, although it can also be used to create sculptures.',
        'photo':'',
    },
    {
        'type':'techniques',
        'name':'Bead Crochet',
        'instructions':'As the name suggests, you can crochet with beads. Of course, you don\'t crochet the beads themselves but instead add the beads to the crochet to create a fabric that combines yarn and beads. Bead crochet is common in crochet jewelry making but also used in other accessories and garments.',
        'photo':'',
    },
    {
        'type':'techniques',
        'name':'Broomstick Lace',
        'instructions':'Broomstick lace is a specific type of crochet in which you draw up loops onto a dowel (or originally, a broomstick) and then work back across to group them together into loops. This creates a very unique fabric.',
        'photo':'',
    },
    {
        'type':'techniques',
        'name':'Hairpin Lace',
        'instructions':'With hairpin lace you combine the use of a crochet hook with the use of a specific type of loom to create a vey lacy, beautiful fabric.',
        'photo':'',
    },
    {
        'type':'techniques',
        'name':"Solomon's Knot",
        'instructions':'The Solomon\'s Knot, also called Lovers Knot, is essentially created by drawing up tall loops and securing them with single crochet stitches. It is used to create a very openwork, lacy fabric',
        'photo':'',
    },
]

app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/index.html')
})

app.get('/api', (req,res) =>{
    res.json(stitches)
})
app.get('/api/name/:stitchName', (req,res)=>{
    const nameSearch = req.params.stitchName.toLowerCase()
    console.log(nameSearch)
    const nameResults = stitches.filter(el => {
        if(el.name.toLowerCase() == nameSearch){
            return el
        }
    })
    console.log(nameResults)
    res.json(nameResults)
})
app.get('/api/type/:crochetType', (req,res)=>{
    const typeSearch = req.params.crochetType.toLowerCase()
    console.log(typeSearch)
    const typeResults = stitches.filter(el => {
        if(el.type.toLowerCase() == typeSearch){
            return el
        }
    })
    console.log(typeResults)
    res.json(typeResults)
   
})   



app.listen(process.env.PORT || PORT, () =>{
    console.log(`Your server is running on port ${PORT}`)
})