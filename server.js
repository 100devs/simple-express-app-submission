const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000

app.use(cors())

const years = {
    "1996": {
        "bookOne": {
        'bookTitle': "Chato's Kitchen",
        'authorName': "Gary Soto",
        'illustratorName': "Susan Guevara",
        'isbn': 9780698116009,
        'synopsis':`Chato can't believe his luck. Not only is he the coolest low-riding cat in East L.A., but his brand-new neighbors are the plumpest, juciest, tastiest-looking family of mice to move into the barrio in a long time. So Chato and his best friend, Novio Boy, get out the pots and pans, the tortillas and the beans--everything you'd need for a welcoming feast, except for the main dish, and the guests of honor. Of course, in Chato's mind they are one and the same thing.

        But the mice are bringing a surprise guest of their own, who may be more than a cool cat can swallow.`
        },
        "bookTwo": {
            'bookTitle': "The Farolitos of Christmas",
            'authorName': 'Rudolfo Anaya',
            'illustratorName': 'Edward Gonzales',
            'isbn': 9780786800605,
            'synopsis': `It's Christmas in San Juan, New Mexico, and young Luz worries that with her grandfather sick and her father in the hospital, wounded from the war, their usual Christmas celebration will not be. Then Luz decides to make her own little lanterns or farolitos to light the path for the oncoming celebration, and for her father, who returns home in time for the holiday. `
        },
    },
    "1997": {
        'bookTitle':"In My Family/En Mi Familia",
        'authorName': 'Carmen Lomas Garza',
        'illustratorName': 'Carmen Lomas Garza',
        'isbn': 9780892391639,
        'synopsis': `Following the best-selling Family Pictures, In My Family/En mi familia is Carmen Lomas Garza's continuing tribute to the family and community that shaped her childhood and her life. Lomas Garza's vibrant paintings and warm personal stories depict memories of growing up in the traditional Mexican-American community of her hometown of Kingsville, Texas.`
    },
    "1998": {
        'bookTitle': "Tomás and the Library Lady",
        'authorName':'Pat Mora',
        'illustratorName': 'Raúl Colón',
        'isbn': 9780375803499,
        'synopsis': `Tomás is a son of migrant workers. Every summer he and his family follow the crops north from Texas to Iowa, spending long, arduous days in the fields. At night they gather around to hear Grandfather's wonderful stories. But before long, Tomás knows all the stories by heart. "There are more stories in the library,"Papa Grande tells him.  The very next day, Tomás meets the library lady and a whole new world opens up for him. 

        Based on the true story of the Mexican-American author and educator Tomás Rivera, a child of migrant workers who went on to become the first minority Chancellor in the University of California system, this inspirational story suggests what libraries--and education--can make possible.  Raul Colón's warm, expressive paintings perfectly interweave the harsh realities of Tomás's life, the joyful imaginings he finds in books, and his special relationships with a wise grandfather and a caring librarian. `
    },
    "1999": {
        'bookTitle': "The Three Pigs/Los Tres Cerdos: Nacho, Tito, and Miguel",
        'authorName': 'Bobbi Salinas',
        'illustratorName': 'Bobbi Salinas',
        'isbn': 9780934925051,
        'synopsis': `This retold, non-violent version of The Three Pigs takes place in the Southwest. Miguel, the cleverest of the pigs, sees through the wolf's artificially sugared tricks, and ultimately destroys the wolf's power to deceive others.`
    },
    "2000": {
        'bookTitle': "My Land Sings: Stories of the Rio Grande",
        'authorName': 'Rudolfo Anaya',
        'illustratorName': 'Amy Córdova',
        'isbn': 9780380729029,
        'synopsis': `A young Spanish man named Rolando journeys to the New World to find the legendary Fountain of Youth. But at what price will Rolando taste the waters of eternal life?

        On a dare, Lupe goes down to the river one night to search for la Llorona, a ghostly woman who walks in search of her drowned baby.
        
        Abel, a shepherd, saves a snake from a fire and in return is given the ability to understand the speech of animals.
        
        In these ten stories, Rudolfo Anaya, author of Bless Me, Ultima, draws on a rich Hispanic and Native American folklore tradition, capturing the rhythm of life along New Mexico's Río Grande valley.`
    },
    "2001": {
        'bookTitle': "My Very Own Room/Mi propio cuartito",
        'authorName': 'Amada Irma Pérez',
        'illustratorName': 'Maya Christina Gonzalez',
        'isbn': 9780892392230,
        'synopsis': `The young Mexican American girl at the center of this charming book loves her family — five younger brothers, her two parents, and several visiting relatives — but in such a crowded house, she can never seem to find a moment alone. Told in both English and Spanish, this boldly illustrated title delivers the inspiring story of a California family that pulled together to give a young girl her own corner of the world. Imparting lessons about collective problem solving, the unshakable bonds of familial love, and the possibilities that arise when you dream big, this book is one for every child's shelf.`
    },
    "2002": {
        'bookTitle': "Breaking Through",
        'authorName': 'Francisco Jiménez',
        'illustratorName':'N/A',
        'isbn':9780618342488,
        'synopsis': `At the age of fourteen, Francisco Jiménez, together with his older brother Roberto and his mother, are caught by la migra. Forced to leave their home in California, the entire family travels all night for twenty hours by bus, arriving at the U.S. and Mexican border in Nogales, Arizona.

        In the months and years that follow during the late 1950s-early 1960s, Francisco, his mother and father, and his seven brothers and sister not only struggle to keep their family together, but also face crushing poverty, long hours of labor, and blatant prejudice. How they sustain their hope, their good-heartedness, and tenacity is revealed in this moving, Pura Belpré Honor–winning sequel to The Circuit. Without bitterness or sentimentality, Francisco Jiménez finishes telling the story of his youth.`
    },
    "2003": {
        'bookTitle': "A Library for Juana: The World of Sor Juana Ines",
        'authorName': 'Pat Mora',
        'illustratorName': 'Beatriz Vidal',
        'isbn': 9781643790589,
        'synopsis': `I am quiet like a turtle."

        So promised Juana Inés, a little girl who loved words, on her first day of school. When she was three years old, Juana Inés followed her sister to school and peeked in the window, then begged the teacher to be allowed to stay so she could learn how to read. Soon she was making up stories, songs, and poems--she loved learning and she loved reading. And she couldn't wait to have her own collection of books! Eventually, Juana went on to become Sor Juana Inés de la Cruz, a nun, and she devoted her life to writing and learning and words. Though she died in 1695, Sor Juana Inés is still considered one of the most brilliant writers in Mexico's history: her poetry is recited by schoolchildren throughout Mexico and is studied at schools and universities around the world. Here is the story of her life, an incredible one full of knowledge, achievement, and inspiration, lovingly told by the renowned children's book author Pat Mora and gorgeously illustrated by Beatriz Vidal.`
    },
    "2004": {
        'bookTitle': "Just a Minute: A Trickster Tale and Counting Book",
        'authorName': ' Yuyi Morales',
        'illustratorName': 'Yuyi Morales',
        'isbn': 9780811864831,
        'synopsis': `In this original trickster tale, Senor Calavera arrives unexpectedly at Grandma Beetle's door. He requests that she leave with him right away. "Just a minute," Grandma Beetle tells him. She still has one house to sweep, two pots of tea to boil, three pounds of corn to make into tortillas -- and that's just the start! Using both Spanish and English words to tally the party preparations, Grandma Beetle cleverly delays her trip and spends her birthday with a table full of grandchildren and her surprise guest. This spirited tribute to the rich traditions of Mexican culture is the perfect introduction to counting in both English and Spanish. The vivacious illustrations and universal depiction of a family celebration are sure to be adored by young readers everywhere.`
    },
    "2005": {
        'bookTitle': "Becoming Naomi León",
        'authorName': 'Pam Muoñz Ryan',
        'illustratorName': 'N/A',
        'isbn': 9780439269971,
        'synopsis': `Naomi Soledad Leon Outlaw has had a lot to contend with in her young life, her name for one. Then there are her clothes (sewn in polyester by Gram), her difficulty speaking up, and her status at school as "nobody special." But according to Gram, most problems can be overcome with positive thinking. And with Gram and her little brother, Owen, life at Avocado Acres Trailer Rancho in California is happy and peaceful...until their mother reappears after seven years of being gone, stirring up all sorts of questions and challenging Naomi to discover and proclaim who she really is.`
    },
    "2006": {
        'bookTitle': "José! Born to Dance",
        'authorName': 'Susanna Reich',
        'illustratorName': 'Raúl Colón',
        'isbn': 9780689865763,
        'synopsis': `José was a boy with a song in his heart and a dance in his step. Born in Mexico in 1908, he came into the world kicking like a steer, and grew up to love to draw, play the piano, and dream. José's dreaming took him to faraway places. He dreamed of bullfighters and the sounds of the cancan dancers that he saw with his father. Dance lit a fire in José's soul.

        With his heart to guide him, José left his family and went to New York to dance. He learned to flow and float and fly through space with steps like a Mexican breeze. When José danced, his spirit soared. From New York to lands afar, José Limón became known as the man who gave the world his own kind of dance.
        
        Susanna Reich's lyrical text and Raúl Colón's shimmering artwork tell the story of a boy who was determined to make a difference in the world, and did. José! Born to Dance will inspire picture book readers to follow their hearts and live their dreams.`
    },
    "2007": {
        'bookTitle': "Downtown Boy",
        'authorName': 'Juan Felipe Herrera',
        'illustratorName':'N/A',
        'isbn': 9780439644891,
        'synopsis': `A novel in verse, this is the tale of a boy who grows up in California in the 1950s brings an exciting new talent to Scholastic Press.

        Juanito Paloma, his mother Lucha, and his elderly father Felipe, are a tiny family who, after years of working in the fields of California's Central Valley, move to San Francisco's Latin Mission District to live with relatives. Juanito longs to be in one place, rather than "going, going, going," and pines for the love of his often-absent father. This family story of growing up Latino will resonate with readers of all backgrounds.`
    },
    "2008": {
        'bookTitle': "Los Gatos Black on Halloween",
        'authorName': 'Marisa Montes',
        'illustratorName': 'Yuyi Morales',
        'isbn': 9781250079459,
        'synopsis': `Under October's luna, full and bright, the monsters are throwing a ball in the Haunted Hall. Las brujas come on their broomsticks. Los muertos rise from their coffins to join in the fun. Los esqueletos rattle their bones as they dance through the door. And the scariest creatures of all aren't even there yet!

        This lively bilingual Halloween poem introduces young readers to a spooky array of Spanish words that will open their ojos to the chilling delights of the season.
        
        Los Gatos Black on Halloween is a 2007 Bank Street - Best Children's Book of the Year, the winner of the 2008 Pura Belpre Medal for Illustration and a Pura Belpre Honor Book for Narrative.
        
        Award-winning author and illustrator Yuyi Morales is the author of Caldecott Honor and Pura Belpré (Illustrator) Medal-winning Viva Frida, Pura Belpré (Illustration) Medal and Pura Belpré (Narrative) Honor book Los Gatos Black on Halloween, stunning bilingual bedtime story Little Night/Nochecita, Rudas: Niño's Horrendous Hermanitas, and other picture books for young readers. She also illustrated Thunder Boy Jr., written by Sherman Alexie.`
    },
    "2009": {
        "bookOne": {
            'bookTitle': "He Forgot To Say Goodbye",
            'authorName': 'Benjamin Alire Sáenz',
            'illustratorName': 'N/A',
            'isbn': 9781416994343,
            'synopsis': `On the surface, Ramiro Lopez and Jake Upthegrove couldn’t live more different lives. Ram is Mexican-American, lives in the poor section of town, and is doing his best to keep his mother sane while his brother fights off a drug-induced coma. Jake is a WASP who drives a nice car, lives in a mansion, and has a mother who drinks a bit too much and a step-father who cheats on her. But there is one point, one issue, where their lives are exactly the same; their fathers walked out on them when they were just young boys. And at this convergence, Ram and Jake see how everything in their lives is just a little bit similar, because they both blame everything that goes wrong on the one thing they actually have in common. A heartfelt novel from an award-winning author.
            `
        },
        "bookTwo": {
            'bookTitle': "The Holy Tortilla and a Pot of Beans",
            'authorName': 'Carmen Tafolla',
            'illustratorName': 'N/A',
            'isbn': 9780916727499,
            'synopsis': `As a helping of “down-home magical realism,” this collection of 16 short stories explores the human spirit inherent in the bilingual, bicultural world of the Texas-Mexico border. With a fresh sense of humor and human understanding, these stories skillfully bridge the gap between miracles and tragedies, prejudice and transcendence, and oppression and liberation. From the comical exploration of the hypocrisy expressed at funerals to the spiritual mission of a magical tortilla, the collection draws upon a wide range of emotions but comes together in a singular, powerful voice that reflects the holiness found in everyday life.`
        },
    },
    "2010": {
        'bookTitle': "What Can You Do With a Paleta?",
        'authorName': 'Carmen Tafolla',
        'illustratorName':'Magaly Morales',
        'isbn': 9781582462219,
        'synopsis': `Where the paleta wagon rings its tinkly belland carries a treasure of icy paletasin every color of the sarape . . .

        As she strolls through her barrio, a young girl introduces readers to the frozen, fruit-flavored treat that thrills Mexican and Mexican-American children. Create a masterpiece, make tough choices (strawberry or coconut?), or cool off on a warm summer's day--there's so much to do with a paleta.`
    },
    "2011": {
        'bookTitle': "Bait",
        'authorName': 'Alex Sanchez',
        'illustratorName': 'N/A',
        'isbn': 9781416937746,
        'synopsis': `Diego has gotten into trouble because of his temper before. But when he punches out a guy in school who was looking at him funny, he finds himself in juvenile court, facing the possibility of probation, or worse—juvenile jail. Mr. Vidas is assigned as his probation officer, but Diego doesn’t trust or like him. However, he doesn’t have a choice—he has to talk to Mr. Vidas, or he’ll find himself in worse trouble. It’s only when Diego starts to open up to Mr. Vidas that he begins to understand that the source of his anger is buried in his past—and to move beyond it, he needs to stop running from his personal demons.`
    },
    "2012": {
        "bookOne": {
            'bookTitle': "Diego Rivera: His World and Ours",
            'authorName': 'Duncan Tonatiuh',
            'illustratorName': 'Duncan Tonatiuh',
            'isbn': 9780810997318,
            'synopsis': `Diego Rivera, one of the most famous painters of the twentieth century, was once just a mischievous little boy who loved to draw. But this little boy would grow up to follow his passion and greatly influence the world of art.
 
            After studying in Spain and France as a young man, Diego was excited to return to his home country of Mexico. There, he toured from the coasts to the plains to the mountains. He met the peoples of different regions and explored the cultures, architecture, and history of those that had lived before. Returning to Mexico City, he painted great murals representing all that he had seen. He provided the Mexican people with a visual history of who they were and, most important, who they are.
             
            Award-winning author and illustrator Duncan Tonatiuh, who has also been inspired by the art and culture of his native Mexico, asks, if Diego was still painting today, what history would he tell through his artwork? What stories would he bring to life? Drawing inspiration from Rivera to create his own original work, Tonatiuh helps young readers to understand the importance of Diego Rivera’s artwork and to realize that they too can tell stories through art.`
        },
        "bookTwo": {
            'bookTitle': "Sylvia and Aki" ,
            'authorName': ' Winifred Conkling',
            'illustratorName': 'N/A',
            'isbn': 9781582463452,
            'synopsis':`Young Sylvia Mendez never expected to be at the center of a landmark legal battle. Young Aki Munemitsu never expected to be sent away from her home and her life as she knew it. The two girls definitely never expected to know each other, until their lives intersected on a Southern California farm in a way that changed the country forever. Who are Sylvia and Aki? And why did their family stories matter then and still matter today? This book reveals the remarkable, never-before-told story—based on true events—of Mendez vs. Westminster School District, the California court case that desegregated schools for Latino children and set the stage for Brown vs. Topeka Board of Education at the national level.
            `
        },
    },
    "2013": {
        'bookTitle': "Under the Mesquite",
        'authorName': 'Guadalupe Garcia McCall',
        'illustratorName': 'N/A',
        'isbn': 9781600604294,
        'synopsis': `Lupita, a budding actor and poet in a close-knit Mexican American immigrant family, comes of age as she struggles with adult responsibilities during her mother's battle with cancer in this young adult novel in verse.


        When Lupita learns Mami has cancer, she is terrified by the possibility of losing her mother, the anchor of her close-knit family. Suddenly, being a high school student, starring in a play, and dealing with friends who don't always understand, become less important than doing whatever she can to save Mami's life.
        
        
        While her father cares for Mami at an out-of-town clinic, Lupita takes charge of her seven younger siblings. As Lupita struggles to keep the family afloat, she takes refuge in the shade of a mesquite tree, where she escapes the chaos at home to write. Forced to face her limitations in the midst of overwhelming changes and losses, Lupita rediscovers her voice and finds healing in the power of words.
        
        
        Told with honest emotion in evocative free verse, Lupita's journey toward hope is captured in moments that are alternately warm and poignant. Under the Mesquite is an empowering story about testing family bonds and the strength of a young woman navigating pain and hardship with surprising resilience.
        `
    },
    "2014": {
        "bookOne":{
            'bookTitle': "Diego Rivera: An Artist for the People",
            'authorName': 'Susan Goldman Rubin',
            'illustratorName': 'Susan Goldman Rubin',
            'isbn': 9780810984110,
            'synopsis': ` Diego Rivera offers young readers unique insight into the life and artwork of the famous Mexican painter and muralist. The book follows Rivera’s career, looking at his influences and tracing the evolution of his style. His work often called attention to the culture and struggles of the Mexican working class. Believing that art should be for the people, he created public murals in both the United States and Mexico, examples of which are included. The book contains a list of museums where you can see Rivera’s art, a historical note, a glossary, and a bibliography.`
        },
        "bookTwo": {
            'bookTitle': "Pancho Rabbit and the Coyote: A Migrant's Tale",
            'authorName': 'Duncan Tonatiuh',
            'illustratorName': 'Duncan Tonatiuh',
            'isbn': 9781419705830,
            'synopsis': `A young rabbit named Pancho eagerly awaits his papa’s return. Papa Rabbit left two years ago to travel far away north to find work in the great carrot and lettuce fields to earn money for his family. When Papa does not return home on the designated day, Pancho sets out to find him. He packs Papa’s favorite meal—mole, rice and beans, a heap of still-warm tortillas, and a jug full of fresh aguamiel—and heads north. He soon meets a coyote, who offers to help Pancho in exchange for some of Papa’s favorite foods. They travel together until the food is gone and the coyote decides he is still hungry . . . for Pancho!
 
            Award-winning author and illustrator Duncan Tonatiuh brings to light the hardship and struggles facing families who seek to make better lives for themselves and their children by illegally crossing the borders.`
        },
    },
  
    "2015": {
        "bookOne": {
            'bookTitle': "Gabi: A Girl in Pieces",
            'authorName': 'Isabel Quintero',
            'illustratorName': 'N/A',
            'isbn': 9781935955955,
            'synopsis': `Gabi Hernandez chronicles her last year in high school in her diary: college applications, Cindy's pregnancy, Sebastian's coming out, the cute boys, her father's meth habit, and the food she craves. And best of all, the poetry that helps forge her identity.

            July 24
            
            My mother named me Gabriella, after my grandmother who, coincidentally, didn't want to meet me when I was born because my mother was unmarried, and therefore living in sin. My mom has told me the story many, many, MANY, times of how, when she confessed to my grandmother that she was pregnant with me, her mother beat her. BEAT HER! She was twenty-five. That story is the basis of my sexual education and has reiterated why it's important to wait until you're married to give it up. So now, every time I go out with a guy, my mom says, "Ojos abiertos, piernas cerradas." Eyes open, legs closed. That's as far as the birds and the bees talk has gone. And I don't mind it. I don't necessarily agree with that whole wait until you're married crap, though. I mean, this is America and the 21st century; not Mexico one hundred years ago. But, of course, I can't tell my mom that because she will think I'm bad. Or worse: trying to be White.`
        },
        "bookTwo": {
            'bookTitle': "Separate is Never Equal",
            'authorName': 'Duncan Tonatiuh',
            'illustratorName': 'Duncan Tonatiuh',
            'isbn': 9781419710544,
            'synopsis': ` 
            When her family moved to the town of Westminster, California, young Sylvia Mendez was excited about enrolling in her neighborhood school. But she and her brothers were turned away and told they had to attend the Mexican school instead. Sylvia could not understand why—she was an American citizen who spoke perfect English. Why were the children of Mexican families forced to attend a separate school? Unable to get a satisfactory answer from the school board, the Mendez family decided to take matters into its own hands and organize a lawsuit.
             
            In the end, the Mendez family’s efforts helped bring an end to segregated schooling in California in 1947, seven years before the landmark Supreme Court ruling in Brown v. Board of Education ended segregation in schools across America.
             
            Using his signature illustration style and incorporating his interviews with Sylvia Mendez, as well as information from court files and news accounts, award-winning author and illustrator Duncan Tonatiuh tells the inspiring story of the Mendez family’s fight for justice and equality.`
        },
    },
  
    "2016": {
        "bookOne": {
            'bookTitle': "Out of Darkness",
            'authorName': 'Ashley Hope Pérez',
            'illustratorName': 'N/A',
            'isbn': 9780823445035,
            'synopsis': `"This is East Texas, and there's lines. Lines you cross, lines you don't cross. That clear?"
            New London, Texas. 1937. Naomi Vargas and Wash Fuller know about the lines in East Texas as well as anyone. They know the signs that mark them. They know the people who enforce them. But sometimes the attraction between two people is so powerful it breaks through even the most entrenched color lines. And the consequences can be explosive.
            
            Ashley Hope Pérez takes the facts of the 1937 New London school explosion―the worst school disaster in American history―as a backdrop for a riveting novel about segregation, love, family, and the forces that destroy people.
            "[This] layered tale of color lines, love and struggle in an East Texas oil town is a pit-in-the-stomach family drama that goes down like it should, with pain and fascination, like a mix of sugary medicine and artisanal moonshine."―The New York Times Book Review`
        },
        "bookTwo": {
            'bookTitle': "Funny Bones: Posada and His Day of the Dead Calaveras",
            'authorName': 'Duncan Tonatiuh',
            'illustratorName': 'Duncan Tonatiuh',
            'isbn': 9781419716478,
            'synopsis': `Funny Bones tells the story of how calaveras came to be. The amusing figures are the creation of Mexican artist José Guadalupe (Lupe) Posada (1852–1913). Lupe learned the art of printing at a young age and soon had his own shop. In a country that was not known for freedom of speech, he drew political cartoons, much to the amusement of the local population but not that of the politicians. He continued to draw cartoons, but he is best known today for his calavera drawings. They have become synonymous with Mexico’s Día de Muertos festival.
 
            Calaveras are skeletons performing all sorts of activities, both everyday and festive: dancing in the streets, playing instruments in a band, pedaling bicycles, promenading in the park, and even sweeping the sidewalks. They are not intended to be frightening, but rather to celebrate the joy of living as well as provide humorous observations about people.
             
            Award-winning author and illustrator Duncan Tonatiuh relates the pivotal moments of Lupe’s life and explains the different artistic processes he used. Juxtaposing his own artwork with Lupe’s, Tonatiuh brings to light the remarkable life and work of a man beloved by many but whose name has remained in obscurity.`
        },
    },
  
    "2017": {
        "bookOne": {
            'bookTitle': "The Memory of Light",
            'authorName': 'Francisco X. Stork',
            'illustratorName': 'N/A',
            'isbn':9780545474337,
            'synopsis': `16-year-old Vicky Cruz wakes up in a hospital's mental ward after a failed suicide attempt. Now she must find a path to recovery - and perhaps rescue some others along the way.

            When Vicky Cruz wakes up in the Lakeview Hospital Mental Disorders ward, she knows one thing: After her suicide attempt, she shouldn't be alive. But then she meets Mona, the live wire; Gabriel, the saint; E.M., always angry; and Dr. Desai, a quiet force. With stories and honesty, kindness and hard work, they push her to reconsider her life before Lakeview, and offer her an acceptance she's never had.
            
            But Vicky's newfound peace is as fragile as the roses that grow around the hospital. And when a crisis forces the group to split up, sending Vick back to the life that drove her to suicide, she must try to find her own courage and strength. She may not have them. She doesn't know.
            
            Inspired in part by the author's own experience with depression, The Memory of Light is the rare young adult novel that focuses not on the events leading up to a suicide attempt, but the recovery from one - about living when life doesn't seem worth it, and how we go on anyway.`
        },
        "bookTwo": {
            'bookTitle': "Maybe Something Beautiful: How Art Transformed a Neighborhood",
            'authorName': "Isabel Campoy & Theresa Howell",
            'illustratorName': 'Rafael López',
            'isbn': 9780544357693,
            'synopsis': `What good can a splash of color do in a community of gray? As Mira and her neighbors discover, more than you might ever imagine!

            Based on the true story of the Urban Art Trail in San Diego, California, Maybe Something Beautiful reveals how art can inspire transformation—and how even the smallest artists can accomplish something big. Pick up a paintbrush and join the celebration!
            
            `
        },
    },
    "2018": {
        "bookOne":{
            'bookTitle': "I Am Not Your Perfect Mexican Daughter",
            'authorName': 'Erika L. Sánchez',
            'illustratorName': 'N/A',
            'isbn': 9781524700515,
            'synopsis': `Perfect Mexican daughters do not go away to college. And they do not move out of their parents’ house after high school graduation. Perfect Mexican daughters never abandon their family.
 
            But Julia is not your perfect Mexican daughter. That was Olga’s role.
             
            Then a tragic accident on the busiest street in Chicago leaves Olga dead and Julia left behind to reassemble the shattered pieces of her family. And no one seems to acknowledge that Julia is broken, too. Instead, her mother seems to channel her grief into pointing out every possible way Julia has failed.
             
            But it’s not long before Julia discovers that Olga might not have been as perfect as everyone thought. With the help of her best friend Lorena, and her first love, first everything boyfriend Connor, Julia is determined to find out. Was Olga really what she seemed? Or was there more to her sister’s story? And either way, how can Julia even attempt to live up to a seemingly impossible ideal?`
        },
        "bookTwo": {
            'bookTitle': "The First Rule of Punk",
            'authorName': 'Celia C. Pérez',
            'illustratorName': 'N/A',
            'isbn': 9780425290422,
            'synopsis': `There are no shortcuts to surviving your first day at a new school—you can’t fix it with duct tape like you would your Chuck Taylors. On Day One, twelve-year-old Malú (María Luisa, if you want to annoy her) inadvertently upsets Posada Middle School’s queen bee, violates the school’s dress code with her punk rock look, and disappoints her college-professor mom in the process. Her dad, who now lives a thousand miles away, says things will get better as long as she remembers the first rule of punk: be yourself.
 
            The real Malú loves rock music, skateboarding, zines, and Soyrizo (hold the cilantro, please). And when she assembles a group of like-minded misfits at school and starts a band, Malú finally begins to feel at home. She'll do anything to preserve this, which includes standing up to an anti-punk school administration to fight for her right to express herself!
            
            Black and white illustrations and collage art throughout make The First Rule of Punk a perfect pick for fans of books like Roller Girl and online magazines like Rookie.`
        },
        "bookThree": {
            'bookTitle': "All Around Us" ,
            'authorName': "Xelena González",
            'illustratorName': 'Adriana M. Garcia',
            'isbn': 9781941026762,
            'synopsis': `Circles are all around us. We just have to look for them. Sometimes they exist in the most unusual places.

            Grandpa says circles are all around us. He points to the rainbow that rises high in the sky after a thundercloud has come. “Can you see? That’s only half of the circle. That rest of it is down below, in the earth.” He and his granddaughter meditate on gardens and seeds, on circles seen and unseen, inside and outside us, on where our bodies come from and where they return to. They share and create family traditions in this stunning exploration of the cycles of life and nature.`
        },
    },

    "2019": {
        "bookOne": {
            'bookTitle': "They Call me Güero, A Border Kid's Poems",
            'authorName': "David Bowles",
            'illustratorName': "N/A",
            'isbn': 9780593462553,
            'synopsis': `Twelve-year-old Güero is Mexican American, at home with Spanish or English and on both sides of the river. He's starting 7th grade with a woke English teacher who knows how to make poetry cool. 

            In Spanish, "Güero" is a nickname for guys with pale skin, Latino or Anglo. But make no mistake: our red-headed, freckled hero is puro mexicano, like Canelo Álvarez, the Mexican boxer. Güero is also a nerd--reader, gamer, musician--who runs with a squad of misfits like him, Los Bobbys. Sure, they get in trouble like anybody else, and like other middle-school boys, they discover girls. Watch out for Joanna! She's tough as nails. 
            
            But trusting in his family's traditions, his accordion and his bookworm squad, he faces seventh grade with book smarts and a big heart. Life is tough for a border kid, but Güero has figured out how to cope. 
            
            He writes poetry.`
        },
        "bookTwo": {
            'bookTitle': "Dreamers" ,
            'authorName': "Yuyi Morales",
            'illustratorName': "Yuyi Morales",
            'isbn': 9780823440559,
            'synopsis': `Dreamers is a celebration of making your home with the things you always carry: your resilience, your dreams, your hopes and history. It's the story of finding your way in a new place, of navigating an unfamiliar world and finding the best parts of it. In dark times, it's a promise that you can make better tomorrows.  

            This lovingly-illustrated picture book memoir looks at the myriad gifts migrantes bring with them when they leave their homes. It's a story about family. And it's a story to remind us that we are all dreamers, bringing our own strengths wherever we roam. Beautiful and powerful at any time but given particular urgency as the status of our own Dreamers becomes uncertain, this is a story that is both topical and timeless.
            
            The lyrical text is complemented by sumptuously detailed illustrations, rich in symbolism. Also included are a brief autobiographical essay about Yuyi's own experience, a list of books that inspired her (and still do), and a description of the beautiful images, textures, and mementos she used to create this book.
            A parallel Spanish-language edition, Soñadores, is also available.`
        },
    },
    "2020": {
        'bookTitle': "My Papi Has A Motorcycle",
        'authorName':"Isabel Quintero",
        'illustratorName': "Zeke Peña",
        'isbn': 9780525553410,
        'synopsis': `When Daisy Ramona zooms around her neighborhood with her papi on his motorcycle, she sees the people and places she's always known. She also sees a community that is rapidly changing around her.

        But as the sun sets purple-blue-gold behind Daisy Ramona and her papi, she knows that the love she feels will always be there.
        
        With vivid illustrations and text bursting with heart, My Papi Has a Motorcycle is a young girl's love letter to her hardworking dad and to memories of home that we hold close in the midst of change.`
    },
    "2021": {
      "bookOne": {
        'bookTitle': "Dreaming with Mariposas",
        'authorName': "Sonia Gutiérrez",
        'illustratorName': 'N/A',
        'isbn': 9781953447999,
        'synopsis': `Sonia Gutiérrez's Dreaming with Mariposas, written in a Tomás Rivera and Sandra Cisneros bildungsroman vignette style, recounts the story of the Martínez family as told through the eyes of transfronteriza/transboundary Sofía Martínez, "Chofi," Francisco and Helena's daughter, as well as multiple narrators, emulating oral tradition. The novel embraces food as a communal practice with the ability to heal a family through storytelling. Dreaming with Mariposas presents glimpses of poetic diction in times of anti-rhetoric, inspiring readers to reclaim their sacred spaces and voices and to pursue dreams even when the future looks dismal. Chofi witnesses institutional racism, sexual harassment, and colorism and learns to navigate her parents' dreams and her dreams as she discovers her superpower, the strength of her Mexican Indigenous heritage, and the spirit world.`
    },
      "bookTwo":{
        'bookTitle': "The Spirit of Chicano Park/El espíritu del Parque Chicano",
        'authorName': 'Beatrice Zamora',
        'illustratorName': 'Maira Meza',
        'isbn': 9780981695020,
        'synopsis': `Join Bettie and Bonky as they discover a magical park located in the most peculiar place, under a bridge! They learn to love their new home in Barrio Logan, a neighborhood with a rich history in San Diego, California. Through the eyes of a mystical señora they travel through a historical journey of a community's struggle to build a park.

        The Spirit of Chicano Park/El espiritu del parque Chicano is a bilingual, children’s picture book that depicts the history of the creation of a historic park located in the community of Logan Heights in San Diego, California. The park was founded in 1970 as a result of a community Take Over of the land. The park was born out of a community’s struggle to create a place for family gatherings amidst the destruction of their community through the enforcement of eminent domain and the building of Interstate 5 freeway and the Coronado Bridge. The park is located underneath the Coronado Bridge. Massive cement pillars support the bridge and fill the park’s landscape.  Community artists painted murals on the pillars that depict the history of the park and the history of the Chicano community. Housed in the center of the park, is a one-of-a-kind stage, called a Kiosco. The park is a living legacy of the people of Logan Heights, now also known as Barrio Logan. It is a vibrant park with community activities, dance ceremonials, and political gatherings occurring on a regular basis. Chicano Park is known nationally and internationally because of its art, but also because it became a symbol of hope and self-determination for the Chicano/Mexican-American community throughout the United States. The park was designated as a Historical Landmark in 2016. 
        
        The book is a full color, historical fiction and magical realism, children’s book written in English and Spanish. The back pages of the book showcase profiles of community organizers, artists, dancers, musicians, low-riders, and other activists who have been instrumental to the park's development.`
    },
       "bookThree": {
        'bookTitle': "Feathered Serpent and the Five Suns: A Mesoamerican Creation Myth",
        'authorName': 'Duncan Tonatiuh',
        'illustratorName': 'N/A',
        'isbn': 9781419746772,
        'synopsis': `Long ago, the gods of Mesoamerica set out to create humans. They tried many times during each sun, or age. When all their attempts failed and the gods grew tired, only one did not give up: Quetzalcóatl—the Feathered Serpent. To continue, he first had to retrieve the sacred bones of creation guarded by Mictlantecuhtli, lord of the underworld. Gathering his staff, shield, cloak, and shell ornament for good luck, Feathered Serpent embarked on the dangerous quest to create humankind.

        Award-winning author and illustrator Duncan Tonatiuh brings to life the story of Feathered Serpent, one of the most important deities in ancient Mesoamerica. With his instantly recognizable, acclaimed art style and grand storytelling, Tonatiuh recounts a thrilling creation tale of epic proportions.`
    },
    },
    "2022": {
        "bookOne": {
            'bookTitle': "Bright Star",
            'authorName': 'Yuyi Morales',
            'illustratorName': 'Yuyi Morales',
            'isbn': 9780823443284,
            'synopsis': `With the combination of powerful, spare language and sumptuous, complex imagery characteristic of her work, Yuyi Morales weaves the tale of a fawn making her way through a landscape that is dangerous, beautiful—and full of potential.  A gentle voice urges her onward, to face her fears and challenge the obstacles that seek to hold her back.
 
            Child, you are awake!
            You are alive!
            You are a bright star,
            Inside our hearts.
            
            With a voice full of calm, contemplative wisdom, readers are invited to listen and observe, to accept themselves—and to dare to shout!
             
            In a world full of uncertainty, Bright Star seeks to offer reassurance and courage. Yuyi Morales' first book since her New York Times bestseller Dreamers explores the borderlands—the plants, animals, and insects that make their home in the desert, and the people who live and travel through this unique and beautiful part of the world. 
             
            Created with a combination of techniques including hand-embroidered lettering, painting, sketching, digital paintings with textures from photographs of the Sonoran Desert, this stunning book is full of beauty—from the handwoven blanket of the endpapers through the last inspiring spread of young families facing their future with determination and hope. 
             
            A Spanish language edition, Lucero, is also available.`
        },
        "bookTwo": {
            'bookTitle': "My Two Border Towns",
            'authorName': 'David Bowles',
            'illustratorName': 'Erika Meza',
            'isbn': 9780593111048,
            'synopsis': `Early one Saturday morning, a boy prepares for a trip to The Other Side/El Otro Lado. It's close--just down the street from his school--and it's a twin of where he lives. To get there, his father drives their truck along the Rio Grande and over a bridge, where they're greeted by a giant statue of an eagle. Their outings always include a meal at their favorite restaurant, a visit with Tío Mateo at his jewelry store, a cold treat from the paletero, and a pharmacy pickup. On their final and most important stop, they check in with friends seeking asylum and drop off much-needed supplies.

            My Two Border Towns by David Bowles, with stunning watercolor illustrations by Erika Meza, is the loving story of a father and son's weekend ritual, a demonstration of community care, and a tribute to the fluidity, complexity, and vibrancy of life on the U.S.-Mexico border.`
        },
        "bookThree": {
            'bookTitle': "Indivisible",
            'authorName': 'Daniel Aleman',
            'illustratorName': 'N/A',
            'isbn': 9780759556058,
            'synopsis': `Mateo Garcia and his younger sister, Sophie, have been taught to fear one word for as long as they can remember: deportation. Over the past few years, however, the fear that their undocumented immigrant parents could be sent back to Mexico started to fade. Ma and Pa have been in the United States for so long, they have American-born children, and they're hard workers and good neighbors. When Mateo returns from school one day to find that his parents have been taken by ICE, he realizes that his family's worst nightmare has become a reality. With his parents' fate and his own future hanging in the balance, Mateo must figure out who he is and what he is capable of, even as he's forced to question what it means to be an American.

            Daniel Aleman's Indivisible is a remarkable story—both powerful in its explorations of immigration in America and deeply intimate in its portrait of a teen boy driven by his fierce, protective love for his parents and his sister.`
        },
    },

    'unknown':{
        'bookTitle': 'unknown',
        'authorName': 'unknown',
        'illustratorName': 'unknown',
        'isbn': 'unknown',
        'synopsis': 'unknown'
    }
}

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html')
})

app.get('/api/:title', (request, response) => {
    const bookTitles = request.params.title.toLowerCase()
    console.log(years[bookTitles])
    if( years[bookTitles] ){
        response.json(years[bookTitles])
    }else{
        response.json(years['unknown'])
    }
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`The server is now running on port ${PORT}!`)
})