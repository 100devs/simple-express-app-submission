# Searchable Shakespeare
Is an API and web client for searching the work of William Shakespeare to 
determine where a quote came from and who said it.  It provides the character
act and scene if it's a play, and the surrounding stanza if it's verse.  

See the project live at [https://searchable-shakespeare.herokuapp.com/](https://searchable-shakespeare.herokuapp.com/)

## How It's Made
**Tech used:** JavaScript, Node, Express, MongoDB, EJS, CSS

Using publically available digitized texts of Shakespeare's works, I first parsed the
texts to build objects to upload to MongoDB.  After that, I built endpoints in Node.js 
using Express for the backend.  The front-end consists of a text search to query
the database via API and some logic to display the result.

## Optimizations:

Improved the parsing efficiency by treating actor lines as block quotes rather 
than running logic on each line of text.  

## Lessons Learned:

Indexing on MongoDB, search MongoDB via regex to prevent issues with spaces and newlines.
Automating data cleaning to prevent parsing problems.

## Examples:

### Search: 
nobler

### Returns:

## THE TRAGEDY OF HAMLET, PRINCE OF DENMARK:ACT III:SCENE I. A room in the Castle. by HAMLET
To be, or not to be, that is the question: Whether 'tis nobler
in the mind to suffer The slings and arrows of outrageous fortune, Or
to take arms against a sea of troubles, And by opposing end them? To
die—to sleep, No more; and by a sleep to say we end The heart-ache, and
the thousand natural shocks That flesh is heir to: 'tis a consummation
Devoutly to be wish'd. To die, to sleep. To sleep, perchance to
dream—ay, there's the rub, For in that sleep of death what dreams may
come, When we have shuffled off this mortal coil, Must give us pause.
There's the respect That makes calamity of so long life. For who would
bear the whips and scorns of time, The oppressor's wrong, the proud
man's contumely, The pangs of dispriz'd love, the law's delay, The
insolence of office, and the spurns That patient merit of the unworthy
takes, When he himself might his quietus make With a bare bodkin? Who
would these fardels bear, To grunt and sweat under a weary life, But
that the dread of something after death, The undiscover'd country, from
whose bourn No traveller returns, puzzles the will, And makes us rather
bear those ills we have Than fly to others that we know not of? Thus
conscience does make cowards of us all, And thus the native hue of
resolution Is sicklied o'er with the pale cast of thought, And
enterprises of great pith and moment, With this regard their currents
turn awry And lose the name of action. Soft you now, The fair Ophelia!
Nymph, in thy orisons Be all my sins remember'd.

## THE SONNETS:151: by William Shakespeare
Love is too young to know what conscience is,
Yet who knows not conscience is born of love?
Then gentle cheater urge not my amiss,
Lest guilty of my faults thy sweet self prove.
For thou betraying me, I do betray
My nobler part to my gross body's treason,
My soul doth tell my body that he may,
Triumph in love, flesh stays no farther reason,
But rising at thy name doth point out thee,
As his triumphant prize, proud of this pride,
He is contented thy poor drudge to be,
To stand in thy affairs, fall by thy side.
No want of conscience hold it that I call,
Her love, for whose dear love I rise and fall.

