/* =====================================================================
   NESTORY CONTENT
   Bands, reading test items and reading texts. Written once and checked
   by teachers. Sample content for the pilot: test items for every band
   from Blue to Diamond, passages and texts for Green, Purple, Lime and
   Dark Blue. More texts are added band by band.
   ===================================================================== */

// [number, name, colour, year, reading age from (months), to (months), grammar focus]
const BANDS = [null,
  [1, "Lilac", "#E6DDF3", "FS1", 42, 48, "Speaking in full sentences about pictures; retelling; rhyme and repeated phrases"],
  [2, "Pink", "#F8DCE6", "FS1–FS2", 48, 54, "Words and spaces; reading captions"],
  [3, "Red", "#F4D0CC", "FS2", 54, 60, "A sentence starts with a capital letter and ends with a full stop"],
  [4, "Yellow", "#FBF0C4", "FS2", 60, 66, "Simple sentences; 'and' to join ideas"],
  [5, "Blue", "#D6E4F5", "Year 1", 66, 72, "Capital letters and full stops; capital letters for names and 'I'"],
  [6, "Green", "#D9EEDC", "Year 1", 72, 75, "Joining words and clauses with 'and'; plurals with -s and -es"],
  [7, "Orange", "#FBE0C7", "Year 1", 75, 78, "Question marks and exclamation marks; -ing, -ed, -er, -est; un-"],
  [8, "Turquoise", "#CFEDEA", "Year 2", 78, 84, "Statements, questions, exclamations and commands; expanded noun phrases; commas in lists"],
  [9, "Purple", "#E2D8F0", "Year 2", 84, 87, "Past and present tense, including progressive forms; joining with or, and, but"],
  [10, "Gold", "#F3E6BF", "Year 2", 87, 90, "Subordination (when, if, that, because); apostrophes; -ness, -ful, -less, -ly"],
  [11, "White", "#F4F4F4", "Year 3", 90, 96, "Conjunctions, adverbs and prepositions for time and cause; a or an; paragraphs"],
  [12, "Lime", "#E6F3C9", "Year 3", 96, 102, "Present perfect tense; word families; inverted commas for direct speech"],
  [13, "Brown", "#E8DCCF", "Year 4", 102, 108, "Expanded noun phrases; fronted adverbials; Standard English verb forms"],
  [14, "Grey", "#E3E5E8", "Year 4", 108, 114, "Plural and possessive -s; apostrophes for plural possession; pronouns for cohesion"],
  [15, "Dark Blue", "#C9D5EA", "Year 5", 114, 126, "Relative clauses; modal verbs; brackets, dashes and commas for parenthesis"],
  [16, "Dark Red", "#E8CACA", "Year 6", 126, 138, "Formal and informal language; passive voice; semi-colons, colons and dashes"],
  [17, "Sapphire", "#CCDAF2", "Stretch", 138, 150, "How sentence length and structure create effect"],
  [18, "Emerald", "#CDEBDC", "Stretch", 150, 162, "Register and tone; complex sentences"],
  [19, "Ruby", "#F0CDD6", "Stretch", 162, 174, "Cohesion across long texts; rhetorical devices"],
  [20, "Diamond", "#EEF2F6", "Stretch", 174, 186, "How writers combine grammar, vocabulary and structure"]
];
const bandName = b => b >= 1 && b <= 20 ? BANDS[b][1] : "Not tested";
const bandColour = b => b >= 1 && b <= 20 ? BANDS[b][2] : "#EEF2F7";

// Year group from a class grade. At schools using Grade numbering, Grade n = Year n + 1 and KG2 = Year 1.
function yearOf(grade){
  const g = String(grade || "").toLowerCase(); let m;
  if((m = g.match(/year\s*(\d+)/))) return +m[1];
  if((m = g.match(/grade\s*(\d+)/))) return +m[1] + 1;
  if(/kg\s*2/.test(g)) return 1;
  if(/kg\s*1|fs\s*2|reception/.test(g)) return 0;
  if(/pre-?\s*k|fs\s*1|nursery/.test(g)) return -1;
  return null;
}
// The band children of each year group are expected to reach
const EXPECTED = { "-1": 1, 0: 3, 1: 6, 2: 9, 3: 11, 4: 13, 5: 15, 6: 16, 7: 17, 8: 18, 9: 19, 10: 20 };
const expectedBand = grade => { const y = yearOf(grade); return y === null ? null : EXPECTED[Math.max(-1, Math.min(10, y))]; };
const fmtAge = m => m == null ? "–" : `${Math.floor(m / 12)}y ${m % 12}m`;
const SKILL_NAMES = { vocabulary: "Vocabulary", retrieval: "Finding information", inference: "Inference", sequencing: "Sequencing", prediction: "Prediction", summarising: "Summarising", structure: "Text structure", language: "Writer's language", sentences: "Reading sentences" };
const RWI_GROUPS = ["", "Ditty", "Red", "Green", "Purple", "Pink", "Orange", "Yellow", "Blue", "Grey", "Completed RWI"];
const RWI_BAND = { Ditty: 2, Red: 3, Green: 4, Purple: 5, Pink: 6, Orange: 7, Yellow: 8, Blue: 9, Grey: 10 };

/* ---------------- Test, section A: sentence completion ----------------
   [sentence with ___, [options], correct index]. Options are shuffled on screen. */
const TEST_A = {
  5: [["The dog ran to get the ___.", ["ball", "sing", "red", "jump"], 0], ["I can see a fish in the ___.", ["pond", "sad", "hop", "cup"], 0], ["Mum put the hat on her ___.", ["head", "run", "big", "sun"], 0], ["The cat is wet. It sat in the ___.", ["rain", "sock", "fast", "ten"], 0]],
  6: [["Sam was sad because he had lost his ___.", ["kite", "jumped", "green", "under"], 0], ["The farmer milks the ___ every morning.", ["cow", "chair", "sleep", "blue"], 0], ["It was dark, so we switched on the ___.", ["light", "apple", "quickly", "swim"], 0], ["The little bird built a ___ in the tree.", ["nest", "shoe", "loud", "after"], 0]],
  7: [["When it started to rain, Mia opened her ___.", ["umbrella", "garden", "pencil", "ladder"], 0], ["The baker took the hot bread out of the ___.", ["oven", "river", "cloud", "pocket"], 0], ["Tom was so tired that he ___ asleep on the sofa.", ["fell", "ate", "sang", "threw"], 0], ["The children clapped because the show was ___.", ["wonderful", "hungry", "empty", "tidy"], 0]],
  8: [["The puppy was frightened of the ___ thunder.", ["loud", "sweet", "flat", "thin"], 0], ["Grandad wears glasses to help him ___ the newspaper.", ["read", "carry", "paint", "bake"], 0], ["We planted seeds and waited for them to ___.", ["grow", "melt", "shout", "fold"], 0], ["The explorer used a map so she would not get ___.", ["lost", "tall", "sweet", "clean"], 0]],
  9: [["Because the bridge was broken, the cars had to find another ___.", ["route", "roof", "rule", "rope"], 0], ["Lena whispered so that she wouldn't ___ the sleeping baby.", ["wake", "bake", "take", "make"], 0], ["The volcano had been ___ for hundreds of years before it erupted.", ["quiet", "quite", "quilt", "quick"], 0], ["The guide explained how the ancient pots were ___.", ["made", "swum", "flown", "laughed"], 0]],
  10: [["The detective examined the footprints to find a ___.", ["clue", "glue", "blue", "true"], 0], ["After the long race, the runners were thirsty and ___.", ["exhausted", "exploded", "explained", "expensive"], 0], ["Penguins cannot fly, but they are excellent ___.", ["swimmers", "drivers", "writers", "painters"], 0], ["The audience gasped when the magician made the rabbit ___.", ["disappear", "disagree", "disappoint", "discover"], 0]],
  11: [["Although the soup smelled delicious, it was far too ___ to eat straight away.", ["hot", "empty", "quiet", "round"], 0], ["The ancient Egyptians built pyramids as ___ for their kings.", ["tombs", "toys", "shops", "ships"], 0], ["Rosa practised every day, so her piano playing ___ a lot.", ["improved", "imagined", "imported", "invited"], 0], ["The sign warned visitors not to ___ the animals.", ["feed", "feel", "feet", "fee"], 0]],
  12: [["The forecast predicted heavy rain, so the match was ___.", ["postponed", "possessed", "positioned", "polished"], 0], ["Bees play an important role in ___ flowers.", ["pollinating", "polluting", "populating", "polishing"], 0], ["The knight's armour was so ___ that he could hardly walk.", ["heavy", "hollow", "humble", "hasty"], 0], ["Instead of arguing, the two friends decided to ___ the problem calmly.", ["discuss", "disguise", "dismiss", "distract"], 0]],
  13: [["The scientist recorded her ___ carefully in a notebook.", ["observations", "obstacles", "occasions", "opponents"], 0], ["The village was so ___ that the nearest shop was ten miles away.", ["remote", "remove", "recent", "regular"], 0], ["The captain ordered the crew to ___ the ship before the storm arrived.", ["secure", "sincere", "severe", "scatter"], 0], ["Despite feeling ___, Amir stood up and gave his speech to the whole school.", ["nervous", "generous", "famous", "enormous"], 0]],
  14: [["The old manuscript was too ___ to be handled without gloves.", ["fragile", "fertile", "futile", "frantic"], 0], ["Her instructions were so ___ that everyone understood them immediately.", ["straightforward", "stubborn", "spontaneous", "strenuous"], 0], ["The rainforest is home to an ___ variety of plants and animals.", ["astonishing", "abandoned", "absent", "accidental"], 0], ["The council decided to ___ the old library rather than knock it down.", ["restore", "resign", "resent", "retreat"], 0]],
  15: [["The professor's argument was ___ by evidence from several experiments.", ["supported", "supposed", "suppressed", "surrounded"], 0], ["Migrating birds rely on a remarkable sense of ___ to find their way.", ["direction", "decoration", "dedication", "description"], 0], ["The talks were ___, and both sides agreed to the new plan.", ["successful", "suspicious", "superficial", "sustainable"], 0], ["The novel's ___ is a young girl who must save her village.", ["protagonist", "prototype", "procession", "proposal"], 0]],
  16: [["The evidence was ___, so the jury could not reach a verdict.", ["inconclusive", "incompatible", "inconsiderate", "incomparable"], 0], ["His ___ remarks offended several members of the committee.", ["tactless", "tactical", "tangible", "tranquil"], 0], ["Deforestation has had a ___ effect on the local wildlife.", ["detrimental", "deliberate", "decorative", "delirious"], 0], ["The poet uses the storm as a ___ for the character's anger.", ["metaphor", "meteor", "method", "motive"], 0]],
  17: [["The explorer's diary gives a vivid, if somewhat ___, account of the expedition.", ["subjective", "subsequent", "substantial", "subordinate"], 0], ["Scientists remain ___ about whether the treatment will work in the long term.", ["sceptical", "spectacular", "sporadic", "superfluous"], 0], ["The town's prosperity was ___ upon the success of its fishing industry.", ["contingent", "continuous", "contagious", "consistent"], 0], ["Her ___ to detail made her an excellent editor.", ["attention", "attraction", "attribution", "attrition"], 0]],
  18: [["The speaker's ___ tone made it clear she found the proposal absurd.", ["sardonic", "symbiotic", "synthetic", "sedentary"], 0], ["The treaty was intended to ___ tensions between the two nations.", ["alleviate", "alienate", "allocate", "alliterate"], 0], ["Critics praised the documentary for its ___ portrayal of rural life.", ["nuanced", "nuclear", "novice", "nautical"], 0], ["The committee's decision was ___ by the discovery of new evidence.", ["undermined", "underwritten", "undertaken", "underfed"], 0]],
  19: [["Though the minister's speech was ___, it contained few concrete proposals.", ["eloquent", "elusive", "eminent", "elated"], 0], ["The Victorian narrator's ___ style can seem long-winded to modern readers.", ["verbose", "vigilant", "volatile", "venerable"], 0], ["Her refusal to compromise was seen by some as principled and by others as ___.", ["obstinate", "obsolete", "obscure", "oblivious"], 0], ["The scientist cautioned that the results, while ___, required further checks.", ["promising", "prohibitive", "provincial", "profane"], 0]],
  20: [["The essayist argues that progress is not ___ but depends on the choices of each generation.", ["inevitable", "ineffable", "inanimate", "incessant"], 0], ["The author's ___ use of irony lets her criticise society without appearing to do so.", ["subtle", "sullen", "servile", "sedate"], 0], ["The general's ___ retreat saved his army from certain defeat.", ["judicious", "ludicrous", "jocular", "gratuitous"], 0], ["The pamphlet was dismissed as mere ___, designed to provoke rather than inform.", ["polemic", "panacea", "paradigm", "pastiche"], 0]]
};

/* ---------------- Test, section B: passages ----------------
   questions: [question, [options], correct index, skill] */
const TEST_B = {
  6: [{ title: "The Lost Kite", text: [
      "Ben had a red kite. One windy day, he took it to the park with Dad. The kite went up and up. It danced in the sky like a bird.",
      "Then the string slipped out of Ben's hand! The kite flew over the trees. Ben was sad. Dad held his hand and they looked and looked.",
      "At last they found the kite in a big bush. Ben hugged it tight. \"I will hold on next time,\" he said."],
    q: [["What colour was Ben's kite?", ["red", "blue", "green"], 0, "retrieval"],
        ["What happened after the string slipped?", ["The kite flew over the trees.", "They went home for lunch.", "Ben flew the kite again."], 0, "sequencing"],
        ["How did Ben feel when they found the kite?", ["happy", "angry", "sleepy"], 0, "inference"],
        ["\"It danced in the sky.\" This means the kite…", ["moved about happily", "fell to the ground", "stayed very still"], 0, "vocabulary"]] }],
  9: [{ title: "Hedgehogs", text: [
      "Hedgehogs are small mammals with about 5,000 sharp spines on their backs. When a hedgehog is frightened, it rolls into a tight ball so that its spines point outwards. This protects its soft tummy from predators such as foxes and badgers.",
      "Hedgehogs are nocturnal, which means they sleep during the day and search for food at night. They eat beetles, worms, caterpillars and slugs, so gardeners are often pleased to see them.",
      "In winter, food is hard to find. Hedgehogs build nests of leaves and hibernate until spring. While they hibernate, their hearts beat very slowly and they use the fat they stored in autumn.",
      "You can help hedgehogs by leaving a small gap under your garden fence, so they can travel safely between gardens."],
    q: [["What does a hedgehog do when it is frightened?", ["It rolls into a tight ball.", "It climbs up a tree.", "It hides in a pond."], 0, "retrieval"],
        ["What does \"nocturnal\" mean?", ["active at night", "very small", "covered in spines"], 0, "vocabulary"],
        ["Why are gardeners pleased to see hedgehogs?", ["They eat slugs and insects that harm plants.", "They dig holes for planting.", "They keep foxes away from houses."], 0, "inference"],
        ["What do hedgehogs live on while they hibernate?", ["fat they stored in autumn", "worms they find at night", "leaves from their nest"], 0, "retrieval"],
        ["Which is the best heading for the last paragraph?", ["How you can help hedgehogs", "What hedgehogs eat", "Hedgehogs in winter"], 0, "summarising"]] }],
  12: [{ title: "The Lighthouse Keeper's Daughter", text: [
      "Every evening, Noor climbed the hundred and twelve steps of the lighthouse to help her father light the great lamp. Tonight, however, he was ill in bed, and the storm outside was growing fiercer by the minute.",
      "Noor pressed her face against the cold window. Far out at sea, a tiny light was rising and falling with the waves. A fishing boat! Without the lighthouse beam, it would never find its way past the rocks.",
      "Her heart was pounding as she started to climb. Her legs ached and the wind howled through the cracks in the walls, but she did not stop. At the top, her fingers trembled as she struck the match. Once, twice… on the third try, the wick caught, and a golden beam swept across the black water.",
      "Noor watched as the little boat turned slowly away from the rocks and towards the safety of the harbour. When she finally crept back downstairs, her father was awake. \"I saw the light,\" he whispered with a smile. \"I knew it was you.\""],
    q: [["Why couldn't Noor's father light the lamp?", ["He was ill in bed.", "He was out at sea.", "He had lost the matches."], 0, "retrieval"],
        ["How did Noor feel as she climbed the steps?", ["nervous but determined", "bored and sleepy", "angry with her father"], 0, "inference"],
        ["What does \"fiercer\" mean in the first paragraph?", ["stronger and more violent", "quieter and calmer", "colder and wetter"], 0, "vocabulary"],
        ["\"The wind howled through the cracks.\" This makes the storm seem…", ["wild and frightening", "gentle and peaceful", "funny and playful"], 0, "language"],
        ["Which sentence best sums up the story?", ["Noor bravely lights the lamp and saves a fishing boat.", "Noor learns how to sail a fishing boat.", "A fishing boat sinks during a storm."], 0, "summarising"]] }],
  15: [{ title: "Should Zoos Exist?", text: [
      "For more than two hundred years, zoos have allowed people to see animals from every corner of the world. Today, however, many people question whether keeping wild animals in captivity can ever be fair.",
      "Supporters argue that modern zoos play a vital role in conservation. Breeding programmes have helped to save species such as the Arabian oryx, which had disappeared from the wild by 1972 but has since been successfully returned to the deserts of the Arabian Peninsula. Zoos also fund research and inspire millions of visitors, especially children, to care about wildlife.",
      "Critics, on the other hand, point out that even the most spacious enclosure is tiny compared with an animal's natural range. Elephants, for example, may walk many kilometres a day in the wild. Some animals in captivity develop repetitive behaviours, such as pacing, which may be a sign of stress. Critics believe the money spent on zoos would be better used to protect habitats directly.",
      "Perhaps the answer lies somewhere in between. If zoos focus on species that genuinely benefit from protection, and give animals space to behave naturally, they may continue to earn their place in the modern world."],
    q: [["Which animal was returned to the wild thanks to breeding programmes?", ["the Arabian oryx", "the African elephant", "the polar bear"], 0, "retrieval"],
        ["What does \"captivity\" mean?", ["being kept in an enclosed place", "living freely in the wild", "being very old"], 0, "vocabulary"],
        ["Why does the writer mention pacing?", ["as possible evidence that animals are stressed", "to show that zoo animals are healthy", "to describe how elephants find food"], 0, "inference"],
        ["Why does the writer use \"on the other hand\" in the third paragraph?", ["to introduce the opposite point of view", "to give an example of a zoo", "to show the text is ending"], 0, "structure"],
        ["What is the writer's conclusion?", ["Zoos can be justified if they protect species and give animals space.", "All zoos should close as soon as possible.", "Zoos are perfect and should not change."], 0, "summarising"]] }]
};

/* ---------------- Reading texts ----------------
   Each text: id, band, title, type, text (paragraphs), vocab {word: meaning},
   questions [q, options, answer, skill], grammar {focus, explain, spots [phrases in the text], practice [q, options, answer]} */
const TEXTS = [
  { id: "l12-neighbour", band: 12, title: "The New Neighbour", type: "Story", text: [
      "Mr Okafor has lived at number 12 for forty years. He has grown tomatoes in his garden every summer, and he has never missed a single day of watering them. So when a removal van arrived next door, he peered over the fence with great curiosity.",
      "A girl with a tool belt jumped down from the van. \"Hello!\" she called. \"I'm Lina. Have you seen a small grey cat? She has escaped from her basket!\"",
      "Mr Okafor shook his head, but then he heard a rustle among his tomato plants. Two green eyes stared out from between the leaves.",
      "\"I think,\" he said with a chuckle, \"that your cat has found my vegetables.\"",
      "Lina laughed with relief. Together they lifted the cat out of the leaves. Since that day, Lina has helped Mr Okafor with his watering, and the cat has claimed the sunniest spot on his garden bench."],
    vocab: { curiosity: "wanting to know about something", rustle: "a soft sound of leaves moving", relief: "a happy feeling when a worry goes away", claimed: "took as its own" },
    questions: [["How long has Mr Okafor lived at number 12?", ["forty years", "four years", "twelve years"], 0, "retrieval"], ["What does \"curiosity\" mean?", ["wanting to know about something", "feeling very tired", "being unkind"], 0, "vocabulary"],
      ["How did Mr Okafor know where the cat was?", ["He heard a rustle and saw two eyes.", "Lina told him.", "The cat meowed loudly."], 0, "inference"], ["How have things changed since that day?", ["Lina helps him water his garden.", "Mr Okafor has moved house.", "The cat has gone back to its old home."], 0, "summarising"]],
    grammar: { focus: "Present perfect · inverted commas for speech", explain: "The present perfect ('has lived', 'have finished') links the past to now. Inverted commas go around the exact words someone says, with the punctuation inside.",
      spots: ["has lived", "has grown", "has never missed", "has escaped", "has found", "has helped", "\"Hello!\" she called."],
      practice: [["Which sentence uses the present perfect?", ["Lina has lived here for a week.", "Lina lived here.", "Lina is living here."], 0], ["Which is punctuated correctly?", ["\"Where is my cat?\" asked Lina.", "Where is my cat? asked Lina.", "\"Where is my cat? asked Lina."], 0], ["Choose the word: \"They ___ finished their homework.\"", ["have", "has", "having"], 0]] } },
  { id: "db15-bridge", band: 15, title: "The Bridge Builders", type: "Information", text: [
      "In 1883, the Brooklyn Bridge, which connected Manhattan and Brooklyn across the East River, opened to the public. At the time, it was the longest suspension bridge in the world – a remarkable achievement for engineers who had never attempted anything on such a scale.",
      "The bridge was designed by John Roebling, whose plans used steel wire cables rather than iron chains. Tragically, Roebling died before construction began, so his son Washington took charge. Washington, however, became seriously ill after working in the deep underwater chambers (called caissons) where the foundations were being dug.",
      "Unable to visit the site, Washington watched the work through a telescope from his bedroom window. His wife, Emily Warren Roebling, carried his instructions to the engineers each day. She studied mathematics and engineering so thoroughly that she could answer the engineers' questions herself, and many historians now believe she should be recognised as one of the bridge's builders.",
      "When the bridge finally opened, Emily was the first person to cross it. Today, more than a hundred thousand vehicles may cross it each day."],
    vocab: { suspension: "hanging from strong cables", achievement: "something difficult done successfully", foundations: "the strong base that holds a structure up", thoroughly: "completely and carefully" },
    questions: [["Who designed the bridge?", ["John Roebling", "Washington Roebling", "Emily Warren Roebling"], 0, "retrieval"], ["Why couldn't Washington visit the site?", ["He was seriously ill.", "He was working abroad.", "He had retired."], 0, "retrieval"],
      ["Why do historians believe Emily should be recognised?", ["She understood the engineering and guided the work.", "She paid for the bridge.", "She designed the cables."], 0, "inference"], ["Why are the words \"called caissons\" in brackets?", ["To add extra information that explains a word", "To show someone is speaking", "To mark the most important idea"], 0, "structure"]],
    grammar: { focus: "Relative clauses · parenthesis · modal verbs", explain: "A relative clause adds information about a noun, using who, which, whose, where or that. Brackets, dashes or commas add extra information (parenthesis). Modal verbs (may, should, could) show how likely or necessary something is.",
      spots: ["which connected Manhattan and Brooklyn across the East River", "whose plans used steel wire cables", "(called caissons)", "should be recognised", "may cross"],
      practice: [["Which word starts the relative clause? \"The engineer, who designed the bridge, was famous.\"", ["who", "designed", "famous"], 0], ["Which sentence uses brackets correctly?", ["The caissons (underwater chambers) were dangerous.", "The (caissons underwater) chambers were dangerous.", "The caissons were (dangerous."], 0], ["Which modal verb shows the most certainty?", ["will", "might", "could"], 0]] } }
];

/* =================== GREEN BAND: full set =================== */
/* GREEN BAND (6) · Year 1 · reading age 6y–6y3m · RWI Pink
   Grammar: joining words and clauses with 'and'; plural noun suffixes -s and -es */
const GREEN_A = [
  ["Sam was sad because he had lost his ___.", ["kite", "jumped", "green", "under"], 0],
  ["The farmer milks the ___ every morning.", ["cow", "chair", "sleep", "blue"], 0],
  ["It was dark, so we switched on the ___.", ["light", "apple", "quickly", "swim"], 0],
  ["The little bird built a ___ in the tree.", ["nest", "shoe", "loud", "after"], 0],
  ["I brush my ___ before I go to bed.", ["teeth", "chairs", "cloud", "lunch"], 0],
  ["The fish swims in the ___.", ["sea", "sky", "bed", "tree"], 0],
  ["We put on our coats because it was ___.", ["cold", "hot", "happy", "green"], 0],
  ["The baby is sleeping, so please be ___.", ["quiet", "loud", "fast", "wet"], 0],
  ["Mum cut the cake with a ___.", ["knife", "sock", "hat", "book"], 0],
  ["A frog can ___ very high.", ["jump", "sing", "read", "cook"], 0],
  ["I drink my milk from a ___.", ["cup", "bag", "pen", "box"], 0],
  ["Ben kicked the ball into the ___.", ["goal", "soup", "bed", "sky"], 0],
  ["We ate our lunch and then went out to ___.", ["play", "sleep", "blue", "cup"], 0],
  ["The rabbit hid in a ___ under the ground.", ["hole", "cloud", "cake", "car"], 0],
  ["My big sister helps me ___ my shoes.", ["tie", "eat", "sing", "drink"], 0],
  ["The bus stopped and the children got ___.", ["off", "sad", "red", "fast"], 0],
  ["A bee makes ___.", ["honey", "milk", "bread", "eggs"], 0],
  ["At night I can see the moon and the ___.", ["stars", "cats", "shops", "rain"], 0],
  ["The happy dog wagged its ___.", ["tail", "hat", "cup", "book"], 0],
  ["Mia painted a picture of a red ___.", ["flower", "sing", "quickly", "under"], 0],
  ["When the ice cream got hot, it began to ___.", ["melt", "grow", "jump", "sing"], 0],
  ["Dad read me a story before I went to ___.", ["sleep", "swim", "cook", "shop"], 0],
  ["The duck swam across the ___.", ["pond", "road", "bed", "roof"], 0],
  ["We need a ___ to open the door.", ["key", "sock", "leaf", "spoon"], 0],
  ["The clown had a big red ___.", ["nose", "tree", "bus", "cloud"], 0],
  ["I wear my boots when it is ___ outside.", ["rainy", "happy", "tired", "hungry"], 0],
  ["The cat drank all of its ___.", ["milk", "chair", "car", "coat"], 0],
  ["Birds use their ___ to fly.", ["wings", "teeth", "ears", "hands"], 0],
  ["The train went into a long, dark ___.", ["tunnel", "sandwich", "pillow", "pencil"], 0],
  ["Lena put the letter in the ___.", ["post box", "bath", "oven", "fridge"], 0]
];

const GREEN_B = [
  { title: "The Lost Kite", text: [
      "Ben had a red kite. One windy day, he took it to the park with Dad. The kite went up and up. It danced in the sky like a bird.",
      "Then the string slipped out of Ben's hand! The kite flew over the trees. Ben was sad. Dad held his hand and they looked and looked.",
      "At last they found the kite in a big bush. Ben hugged it tight. \"I will hold on next time,\" he said."],
    q: [["What colour was Ben's kite?", ["red", "blue", "green"], 0, "retrieval"],
        ["What happened after the string slipped?", ["The kite flew over the trees.", "They went home for lunch.", "Ben flew the kite again."], 0, "sequencing"],
        ["How did Ben feel when they found the kite?", ["happy", "angry", "sleepy"], 0, "inference"],
        ["\"It danced in the sky.\" This means the kite…", ["moved about happily", "fell to the ground", "stayed very still"], 0, "vocabulary"]] },
  { title: "Ducks", text: [
      "Ducks are birds. They live near ponds, lakes and rivers.",
      "Ducks have webbed feet. Their feet are like paddles, so they can swim fast. Ducks have soft feathers. The feathers have oil on them, so the water rolls off and the duck stays dry.",
      "Ducks eat seeds, bugs and plants. A mother duck lays her eggs in a nest. Her babies are called ducklings. The ducklings follow their mum in a long line!"],
    q: [["Where do ducks live?", ["near ponds, lakes and rivers", "high up in trees", "in hot deserts"], 0, "retrieval"],
        ["Why can ducks swim fast?", ["Their feet are like paddles.", "They are very small.", "They eat lots of bugs."], 0, "retrieval"],
        ["What are baby ducks called?", ["ducklings", "kittens", "cubs"], 0, "retrieval"],
        ["What keeps a duck dry?", ["the oil on its feathers", "its long line", "the seeds it eats"], 0, "inference"]] },
  { title: "Rainy Day", text: [
      "Pitter, patter, on the window,",
      "Pitter, patter, on the street.",
      "Rain is dripping off the rooftops,",
      "Rain is splashing on my feet.",
      "On go boots and on goes coat,",
      "Out I go to jump and play.",
      "Splish and splosh in all the puddles,",
      "What a lovely rainy day!"],
    q: [["Where is the rain dripping from?", ["the rooftops", "the trees", "the clouds"], 0, "retrieval"],
        ["What does the child put on?", ["boots and a coat", "a hat and gloves", "a swimsuit"], 0, "retrieval"],
        ["How does the child feel about the rain?", ["happy", "scared", "cross"], 0, "inference"],
        ["Which words sound like the rain?", ["pitter, patter", "boots and coat", "lovely day"], 0, "language"]] }
];

const AND = { focus: "Joining with 'and'", explain: "We use 'and' to join two words, or to join two ideas into one sentence." };
const PLURAL = { focus: "Plurals: -s and -es", explain: "To mean more than one, we usually add -s (cat → cats). After s, x, sh, ch and z we add -es (fox → foxes, dish → dishes)." };

const GREEN_TEXTS = [
  { id: "g6-pip", band: 6, title: "Pip the Puppy", type: "Story", text: [
      "Pip is a little brown puppy. He has a red ball and a blue bone. Every morning, Pip runs in the garden and digs in the mud. Mum says, \"Pip, you are a muddy pup!\"",
      "Pip likes to sniff the flowers and chase the bees. He likes to sit in the sun and watch the birds.",
      "One day, Pip saw two cats on the wall. They had long tails and green eyes. Pip barked and barked. The cats jumped down and ran away. Pip wagged his tail. He felt so proud.",
      "Then it began to rain. Pip ran inside and shook his wet fur. Water went all over the floor! Mum laughed and gave him a big hug. Then she dried him with a soft towel.",
      "Pip curled up in his bed and went to sleep."],
    vocab: { proud: "pleased with yourself", curled: "lay down in a round shape" },
    questions: [["What colour is Pip's ball?", ["red", "blue", "brown"], 0, "retrieval"], ["Why did the cats run away?", ["Pip barked at them.", "It started to rain.", "They wanted their tea."], 0, "inference"],
      ["What happened when Pip shook his wet fur?", ["Water went all over the floor.", "The cats came back.", "He found his bone."], 0, "sequencing"], ["How did Pip feel after the cats ran away?", ["proud", "scared", "sleepy"], 0, "inference"]],
    grammar: Object.assign({}, AND, { spots: ["a red ball and a blue bone", "runs in the garden and digs in the mud", "sniff the flowers and chase the bees", "jumped down and ran away", "laughed and gave him a big hug"],
      practice: [["Which word joins the two ideas? \"Pip ran inside and shook his wet fur.\"", ["and", "inside", "wet"], 0], ["Choose the joining word: \"Pip has a red ball ___ a blue bone.\"", ["and", "the", "is"], 0], ["Which sentence joins two things Pip did?", ["Pip sniffed the flowers and chased the bees.", "Pip is a little puppy.", "Pip went to sleep."], 0]] }) },
  { id: "g6-bus", band: 6, title: "The Big Red Bus", type: "Story", text: [
      "Grandad drives a big red bus. Every day, he drives it through the town.",
      "At the first stop, two boys get on with their bags. At the next stop, three girls get on with their lunch boxes. Then a man gets on with a box of glasses, and a lady gets on with six bunches of flowers.",
      "\"Is there room for me?\" asks a little fox at the last stop. He has two dishes of jam and a basket of eggs. \"Yes, hop on!\" says Grandad.",
      "The bus goes past the shops and the parks. It goes past the trees and the houses. The children sing songs, and the fox shares his jam.",
      "At the end of the day, everyone gets off. \"Thank you, Grandad!\" they shout. Grandad smiles. He loves his big red bus and all the people (and foxes!) who ride on it."],
    vocab: { bunches: "groups of flowers held together", basket: "a bag made of woven sticks, with a handle" },
    questions: [["Who drives the bus?", ["Grandad", "the fox", "Mum"], 0, "retrieval"], ["What does the man get on with?", ["a box of glasses", "a basket of eggs", "lunch boxes"], 0, "retrieval"],
      ["What did the fox share?", ["his jam", "his eggs", "his songs"], 0, "retrieval"], ["How does Grandad feel about his bus?", ["He loves it.", "He is bored of it.", "He is scared of it."], 0, "inference"]],
    grammar: Object.assign({}, PLURAL, { spots: ["boys", "bags", "lunch boxes", "glasses", "bunches", "dishes", "shops", "parks", "foxes"],
      practice: [["One box, two ___", ["boxes", "boxs", "box"], 0], ["One bus, two ___", ["buses", "buss", "bus"], 0], ["One shop, two ___", ["shops", "shopes", "shop"], 0]] }) },
  { id: "g6-picnic", band: 6, title: "Zara's Picnic", type: "Story", text: [
      "It was a sunny Saturday. Zara and her brother Adam wanted to have a picnic in the park.",
      "Zara packed the sandwiches and the apples. Adam packed the juice and the cups. Mum packed a big blanket.",
      "At the park, they found a spot under a tall tree. They spread out the blanket and sat down. Just then, a hungry duck waddled up. \"Quack!\" it said. It looked at the sandwiches.",
      "\"No, Mr Duck,\" said Zara. \"Bread is not good for ducks.\" Adam had an idea. He gave the duck some peas from his lunch box. The duck gobbled them up and quacked again.",
      "Soon, four more ducks came. Zara and Adam laughed and shared all their peas. \"Next time,\" said Mum, \"we will bring a bag of peas for the ducks and a bag of sandwiches for us!\""],
    vocab: { waddled: "walked with short steps, rocking from side to side", gobbled: "ate very quickly" },
    questions: [["Where did they have the picnic?", ["in the park", "on the beach", "at school"], 0, "retrieval"], ["What did Adam give the duck?", ["peas", "bread", "apples"], 0, "retrieval"],
      ["Why didn't Zara give the duck her sandwich?", ["Bread is not good for ducks.", "She was very hungry.", "The duck did not like it."], 0, "inference"], ["What will they bring next time?", ["a bag of peas for the ducks", "a bigger blanket", "more cups"], 0, "prediction"]],
    grammar: Object.assign({}, AND, { spots: ["Zara and her brother Adam", "the sandwiches and the apples", "the juice and the cups", "spread out the blanket and sat down", "gobbled them up and quacked again"],
      practice: [["Choose the joining word: \"Zara packed the sandwiches ___ the apples.\"", ["and", "but", "the"], 0], ["Find the joining word: \"The duck gobbled them up and quacked again.\"", ["and", "duck", "up"], 0], ["Which sentence joins \"They spread out the blanket.\" and \"They sat down.\"?", ["They spread out the blanket and sat down.", "They spread out the blanket sat down.", "And they spread out the blanket."], 0]] }) },
  { id: "g6-garden", band: 6, title: "Grandma's Garden", type: "Story", text: [
      "Grandma has a garden behind her house. Every week, Leo helps her.",
      "First, they pull out the weeds. Then they water the plants with two big cans. Leo likes the tomatoes best. They are red and round.",
      "In one corner, there are bushes with lots of berries. Leo picks them and puts them in two dishes. \"Look!\" says Grandma. \"Can you see the bugs?\"",
      "Leo looks closely. He can see ladybirds on the leaves and worms in the soil. He can see bees on the flowers. \"Bugs help the garden,\" says Grandma. \"The bees help the flowers, and the worms help the soil.\"",
      "At the end of the day, Leo and Grandma sit on the bench. \"I love your garden, Grandma,\" says Leo. \"It is our garden,\" Grandma smiles."],
    vocab: { weeds: "plants that grow where you don't want them", soil: "the earth that plants grow in" },
    questions: [["What does Leo like best?", ["the tomatoes", "the berries", "the bees"], 0, "retrieval"], ["Where does Leo put the berries?", ["in two dishes", "in his pocket", "in the cans"], 0, "retrieval"],
      ["How do worms help the garden?", ["They help the soil.", "They eat the flowers.", "They water the plants."], 0, "retrieval"], ["Why does Grandma say \"It is our garden\"?", ["Leo helps her look after it.", "Leo planted all of it.", "She is giving it away."], 0, "inference"]],
    grammar: Object.assign({}, PLURAL, { spots: ["weeds", "plants", "cans", "bushes", "dishes", "bugs", "worms", "bees", "flowers"],
      practice: [["One bush, two ___", ["bushes", "bushs", "bush"], 0], ["One dish, two ___", ["dishes", "dishs", "dish"], 0], ["One worm, two ___", ["worms", "wormes", "worm"], 0]] }) },
  { id: "g6-camels", band: 6, title: "Camels", type: "Information", text: [
      "Camels live in hot, dry deserts. They have long legs and big, flat feet. Their feet help them walk on soft sand without sinking.",
      "Camels have humps on their backs. Some camels have one hump, and some have two humps. The hump is full of fat, not water! The fat gives the camel energy when there is not much food.",
      "Camels can go for days without drinking. When they find water, they can drink a lot very fast.",
      "Camels have long eyelashes and can close their noses. This keeps out the sand when the wind blows.",
      "People have used camels for a very long time. Camels carry people and bags across the desert. In the UAE, people race camels and look after them with care."],
    vocab: { deserts: "hot, dry places with lots of sand", energy: "the power to move and do things", eyelashes: "the little hairs on the edge of your eyelids" },
    questions: [["What is inside a camel's hump?", ["fat", "water", "sand"], 0, "retrieval"], ["Why do camels have big, flat feet?", ["to walk on soft sand without sinking", "to swim in rivers", "to climb trees"], 0, "retrieval"],
      ["How do camels keep the sand out?", ["long eyelashes and closing their noses", "drinking lots of water", "carrying bags"], 0, "retrieval"], ["What does \"energy\" mean?", ["the power to move and do things", "a kind of food", "a hot wind"], 0, "vocabulary"]],
    grammar: Object.assign({}, AND, { spots: ["long legs and big, flat feet", "one hump, and some have two humps", "long eyelashes and can close their noses", "carry people and bags", "race camels and look after them"],
      practice: [["Choose the joining word: \"Camels have long legs ___ big feet.\"", ["and", "so", "the"], 0], ["Which sentence joins two things camels can do?", ["Camels can close their noses and drink fast.", "Camels live in deserts.", "The hump is full of fat."], 0], ["Which sentence joins \"Camels live in deserts.\" and \"They eat plants.\"?", ["Camels live in deserts and they eat plants.", "Camels live in deserts they eat plants.", "Camels and live in deserts."], 0]] }) },
  { id: "g6-seed", band: 6, title: "How to Plant a Seed", type: "Instructions", text: [
      "You will need: two small pots, some soil, three bean seeds and a cup of water.",
      "1. Fill the pots with soil. Press it down gently with your fingers.",
      "2. Make a small hole in the soil with a pencil.",
      "3. Put one seed in each hole. Cover the seeds with soil.",
      "4. Water the pots. Do not give them too much water!",
      "5. Put the pots on a sunny window. Check them every day and keep the soil damp.",
      "After about a week, you will see small green shoots. The plants need sunlight and water to grow. Draw your plants every few days. Which pot grows the fastest?"],
    vocab: { damp: "a little bit wet", shoots: "new parts of a plant growing up out of the soil" },
    questions: [["How many bean seeds do you need?", ["three", "two", "one"], 0, "retrieval"], ["Where should you put the pots?", ["on a sunny window", "in a dark cupboard", "in the fridge"], 0, "retrieval"],
      ["What do the plants need to grow?", ["sunlight and water", "pencils and paper", "sand and wind"], 0, "retrieval"], ["Why should you not give the seeds too much water?", ["The seeds could get too wet and rot.", "The pots would turn blue.", "The plants would grow too fast."], 0, "inference"]],
    grammar: Object.assign({}, PLURAL, { spots: ["pots", "seeds", "fingers", "shoots", "plants"],
      practice: [["One pot, two ___", ["pots", "potes", "pot"], 0], ["One glass, two ___", ["glasses", "glasss", "glass"], 0], ["Which word means more than one?", ["seeds", "seed", "soil"], 0]] }) },
  { id: "g6-senses", band: 6, title: "Our Five Senses", type: "Information", text: [
      "We have five senses. They help us learn about the world around us.",
      "We see with our eyes. We can see colours and shapes, and we can see things near and far.",
      "We hear with our ears. We can hear birds singing and children laughing.",
      "We smell with our nose. We can smell flowers and fresh bread.",
      "We taste with our tongue. Some foods taste sweet, and some foods taste sour. Lemons are sour and honey is sweet!",
      "We feel with our skin. We can feel if something is hot or cold, soft or hard.",
      "Our senses keep us safe too. We can smell smoke and hear a car coming. Which sense do you use the most?"],
    vocab: { senses: "the ways our body finds out about the world", sour: "a sharp taste, like a lemon", tongue: "the part inside your mouth you taste with" },
    questions: [["What do we use to taste?", ["our tongue", "our ears", "our skin"], 0, "retrieval"], ["Which food is sour?", ["lemons", "honey", "bread"], 0, "retrieval"],
      ["How many senses do we have?", ["five", "four", "six"], 0, "retrieval"], ["How can our senses keep us safe?", ["We can smell smoke and hear a car coming.", "We can see colours.", "We can taste honey."], 0, "inference"]],
    grammar: Object.assign({}, AND, { spots: ["colours and shapes", "near and far", "birds singing and children laughing", "flowers and fresh bread", "Lemons are sour and honey is sweet"],
      practice: [["Choose the joining word: \"We see with our eyes ___ hear with our ears.\"", ["and", "so", "or"], 0], ["Which part joins two words with 'and'?", ["near and far", "with our eyes", "five senses"], 0], ["Which sentence joins \"I can smell the flowers.\" and \"I can smell the bread.\"?", ["I can smell the flowers and the bread.", "I can smell the flowers the bread.", "And I can smell the flowers."], 0]] }) },
  { id: "g6-homes", band: 6, title: "Animal Homes", type: "Information", text: [
      "Animals need homes, just like us. Homes keep them safe and warm.",
      "Birds build nests in trees. They use twigs, grass and feathers. Rabbits dig burrows under the ground. A burrow has lots of tunnels.",
      "Bees live in hives. Thousands of bees live together in one hive! Foxes live in dens. A den can be under a tree or in a hole in a bank.",
      "Some animals carry their homes with them. Snails and tortoises have hard shells on their backs. When they are scared, they hide inside their shells.",
      "Even tiny insects have homes. Ants make nests under the ground, with lots of little rooms. Which animal home would you like to visit?"],
    vocab: { burrows: "holes and tunnels that animals dig under the ground", hives: "homes where bees live together", insects: "tiny animals with six legs" },
    questions: [["Where do rabbits live?", ["in burrows", "in hives", "in trees"], 0, "retrieval"], ["What do birds use to build nests?", ["twigs, grass and feathers", "sand and stones", "shells"], 0, "retrieval"],
      ["When do snails hide in their shells?", ["when they are scared", "when they are hungry", "when it is sunny"], 0, "retrieval"], ["Which animal carries its home on its back?", ["a tortoise", "a fox", "a bee"], 0, "inference"]],
    grammar: Object.assign({}, PLURAL, { spots: ["nests", "twigs", "burrows", "tunnels", "hives", "Foxes", "dens", "shells"],
      practice: [["One fox, two ___", ["foxes", "foxs", "fox"], 0], ["One nest, two ___", ["nests", "nestes", "nest"], 0], ["Which word means more than one?", ["hives", "hive", "home"], 0]] }) },
  { id: "g6-pockets", band: 6, title: "What's in My Pockets?", type: "Poem", text: [
      "In my pockets, what's inside?",
      "Let me look, I will not hide!",
      "Two red buttons, round and bright,",
      "Three smooth pebbles, grey and white.",
      "Four old tickets from the bus,",
      "Five small boxes (what a fuss!),",
      "Six tiny shells from by the sea,",
      "And sticky sweets, just for me!",
      "Mum says, \"Empty them, please do!\"",
      "So now my pockets look brand new."],
    vocab: { pebbles: "small, smooth stones", fuss: "a lot of worry about something small" },
    questions: [["How many red buttons are in the pockets?", ["two", "three", "six"], 0, "retrieval"], ["Where did the shells come from?", ["the sea", "the bus", "the shop"], 0, "retrieval"],
      ["What does Mum ask the child to do?", ["empty the pockets", "find the buttons", "buy some sweets"], 0, "retrieval"], ["Which two words rhyme?", ["inside and hide", "bright and sea", "bus and new"], 0, "language"]],
    grammar: Object.assign({}, PLURAL, { spots: ["pockets", "buttons", "pebbles", "tickets", "boxes", "shells", "sweets"],
      practice: [["One box, two ___", ["boxes", "boxs", "box"], 0], ["One button, two ___", ["buttons", "buttones", "button"], 0], ["One shell, two ___", ["shells", "shelles", "shell"], 0]] }) },
  { id: "g6-beach", band: 6, title: "At the Beach", type: "Poem", text: [
      "Sun and sand and sea and sky,",
      "Gulls and kites go flying by.",
      "I dig a hole and build a wall,",
      "I find a crab, so very small!",
      "I splash and paddle, jump and run,",
      "Mum and Dad join in the fun.",
      "Ice cream drips and towels flap,",
      "Baby has a sleepy nap.",
      "We pack our bags and wave goodbye",
      "To sun and sand and sea and sky."],
    vocab: { gulls: "seabirds with white and grey feathers", paddle: "walk in shallow water" },
    questions: [["What does the child build?", ["a wall", "a boat", "a kite"], 0, "retrieval"], ["What does the child find?", ["a small crab", "a big fish", "a shell"], 0, "retrieval"],
      ["Who has a nap?", ["Baby", "Mum", "Dad"], 0, "retrieval"], ["What is special about the first and last lines?", ["They are almost the same.", "They are questions.", "They are very long."], 0, "structure"]],
    grammar: Object.assign({}, AND, { spots: ["Sun and sand and sea and sky", "dig a hole and build a wall", "splash and paddle, jump and run", "Mum and Dad", "pack our bags and wave goodbye"],
      practice: [["Which word is used again and again to join words in this poem?", ["and", "sea", "the"], 0], ["Choose the joining word: \"I dig a hole ___ build a wall.\"", ["and", "the", "is"], 0], ["Which line joins two things the child does?", ["I dig a hole and build a wall.", "Baby has a sleepy nap.", "Gulls go flying by."], 0]] }) }
];


TEST_A[6] = GREEN_A; TEST_B[6] = GREEN_B; TEXTS.unshift(...GREEN_TEXTS);

/* =================== PURPLE BAND: full set =================== */
/* PURPLE BAND (9) · Year 2 · reading age 7y–7y3m · RWI Blue
   Grammar: past and present tense used consistently, including progressive forms; co-ordination with or, and, but */
const PURPLE_A = [
  ["Because the bridge was broken, the cars had to find another ___.", ["route", "roof", "rule", "rope"], 0],
  ["Lena whispered so that she wouldn't ___ the sleeping baby.", ["wake", "bake", "take", "make"], 0],
  ["The volcano had been ___ for hundreds of years before it erupted.", ["quiet", "quite", "quilt", "quick"], 0],
  ["The guide explained how the ancient pots were ___.", ["made", "swum", "flown", "laughed"], 0],
  ["The children were ___ because the school trip was tomorrow.", ["excited", "purple", "slowly", "under"], 0],
  ["The baby bird was too small to ___ from the nest.", ["fly", "flew", "flying", "flies"], 0],
  ["Please ___ your hands before you eat.", ["wash", "watch", "wish", "was"], 0],
  ["The giant was so ___ that his head touched the clouds.", ["tall", "tail", "tell", "tile"], 0],
  ["Mum asked me to ___ the table for dinner.", ["set", "sit", "sat", "seat"], 0],
  ["Yesterday, the children ___ to the park.", ["walked", "walk", "walking", "walks"], 0],
  ["The snail moved very ___ across the path.", ["slowly", "slow", "slowed", "slowing"], 0],
  ["I could not ___ the top shelf, so I stood on a chair.", ["reach", "teach", "beach", "peach"], 0],
  ["The pirate buried the ___ on the island.", ["treasure", "measure", "pleasure", "leisure"], 0],
  ["We wear a helmet to keep our heads ___.", ["safe", "save", "same", "sale"], 0],
  ["The owl hunts at night and ___ during the day.", ["sleeps", "sleep", "slept", "sleeping"], 0],
  ["Our teacher read us a story about a brave ___.", ["knight", "night", "knit", "knot"], 0],
  ["My ice cream fell on the floor and I started to ___.", ["cry", "dry", "fry", "try"], 0],
  ["There was a ___ of thunder and everyone jumped.", ["crash", "crush", "cash", "crab"], 0],
  ["The shop was closed, so we had to come back ___.", ["later", "ladder", "letter", "latter"], 0],
  ["Amira used a ruler to ___ a straight line.", ["draw", "drawer", "drew", "drawn"], 0],
  ["The tortoise won the race because he never ___ up.", ["gave", "gives", "give", "giving"], 0],
  ["My brother is ___ than me, but I am faster.", ["taller", "tallest", "tall", "tallness"], 0],
  ["The birthday cake was ___ with strawberries and cream.", ["decorated", "delighted", "declared", "delivered"], 0],
  ["We could hear the waves ___ against the rocks.", ["crashing", "crushing", "catching", "counting"], 0],
  ["It was so foggy that we could ___ see the road.", ["hardly", "harder", "hard", "hardest"], 0],
  ["The farmer ___ the sheep into the field.", ["led", "lid", "lad", "laid"], 0],
  ["Hassan ___ his juice because he was thirsty.", ["drank", "drink", "drunk", "drinking"], 0],
  ["The library is a ___ place, so please whisper.", ["quiet", "quite", "quit", "quilt"], 0],
  ["The firefighters were very ___ when they rescued the cat.", ["brave", "brain", "bread", "braid"], 0],
  ["You can choose an apple ___ a banana.", ["or", "of", "on", "our"], 0]
];

const PURPLE_B = [
  { title: "Hedgehogs", text: [
      "Hedgehogs are small mammals with about 5,000 sharp spines on their backs. When a hedgehog is frightened, it rolls into a tight ball so that its spines point outwards. This protects its soft tummy from predators such as foxes and badgers.",
      "Hedgehogs are nocturnal, which means they sleep during the day and search for food at night. They eat beetles, worms, caterpillars and slugs, so gardeners are often pleased to see them.",
      "In winter, food is hard to find. Hedgehogs build nests of leaves and hibernate until spring. While they hibernate, their hearts beat very slowly and they use the fat they stored in autumn.",
      "You can help hedgehogs by leaving a small gap under your garden fence, so they can travel safely between gardens."],
    q: [["What does a hedgehog do when it is frightened?", ["It rolls into a tight ball.", "It climbs up a tree.", "It hides in a pond."], 0, "retrieval"],
        ["What does \"nocturnal\" mean?", ["active at night", "very small", "covered in spines"], 0, "vocabulary"],
        ["Why are gardeners pleased to see hedgehogs?", ["They eat slugs and insects that harm plants.", "They dig holes for planting.", "They keep foxes away from houses."], 0, "inference"],
        ["What do hedgehogs live on while they hibernate?", ["fat they stored in autumn", "worms they find at night", "leaves from their nest"], 0, "retrieval"],
        ["Which is the best heading for the last paragraph?", ["How you can help hedgehogs", "What hedgehogs eat", "Hedgehogs in winter"], 0, "summarising"]] },
  { title: "The Lost Little Turtle", text: [
      "Every summer night, baby turtles hatch from their eggs on the beach. They crawl towards the bright moon shining on the sea.",
      "One night, Mariam was walking on the beach with her dad. She saw a tiny turtle crawling the wrong way! It was heading towards the lights of the hotels.",
      "\"Dad, it's lost!\" Mariam whispered. \"The lights are confusing it.\"",
      "Dad knew they should not pick it up. So Mariam stood between the turtle and the hotel lights, and Dad pointed his torch at the water. Slowly, the little turtle turned around. It crawled across the cool sand, step by step, until a wave carried it into the sea.",
      "Mariam smiled. \"Good luck, little turtle,\" she said. \"Come back one day!\""],
    q: [["Which lights was the turtle crawling towards?", ["the lights of the hotels", "the moon", "Dad's torch"], 0, "retrieval"],
        ["What does \"whispered\" mean?", ["spoke very quietly", "shouted loudly", "cried"], 0, "vocabulary"],
        ["How did the torch help the turtle?", ["It showed the turtle the way to the sea.", "It kept the turtle warm.", "It scared the turtle away."], 0, "inference"],
        ["What happened after the turtle turned around?", ["It crawled across the sand to the sea.", "It went back to its egg.", "Mariam carried it home."], 0, "sequencing"],
        ["What might Mariam do if she sees another lost turtle?", ["help it find the sea", "take it home as a pet", "run away from it"], 0, "prediction"]] },
  { title: "The Wind", text: [
      "The wind is whistling through the trees,",
      "It's tugging at my coat.",
      "It's rattling all the windows,",
      "It's rocking every boat.",
      "It chased my hat along the street",
      "And blew my kite away,",
      "But when I'm snug inside my bed",
      "It sings till break of day."],
    q: [["What did the wind chase along the street?", ["my hat", "my kite", "a boat"], 0, "retrieval"],
        ["What happened to the kite?", ["The wind blew it away.", "It got stuck in a tree.", "It fell in the sea."], 0, "retrieval"],
        ["What does \"snug\" mean?", ["warm and comfortable", "cold and wet", "scared and lonely"], 0, "vocabulary"],
        ["How does the wind seem at the end of the poem?", ["gentle and calm", "angry and wild", "frightening"], 0, "inference"],
        ["Which word tells you how the wind sounds in the trees?", ["whistling", "tugging", "rocking"], 0, "language"]] }
];

const PCOORD = { focus: "Joining with and, but, or", explain: "We join ideas with 'and' (to add), 'but' (to show something different or surprising) and 'or' (to show a choice)." };
const PPROG = { focus: "Progressive tense (-ing)", explain: "The progressive tense tells us what is or was happening. Present: am / is / are + -ing (the bees are working). Past: was / were + -ing (the rain was falling)." };
const PPAST = { focus: "Past tense", explain: "Stories and recounts are usually told in the past tense. Many past tense verbs end in -ed (walked, painted). Some are different (stood, swam, drew). Keep to the past tense all the way through." };
const PPRESENT = { focus: "Present tense", explain: "Information texts are usually written in the present tense, because they tell us what is true now (a caterpillar eats leaves). Keep to the present tense all the way through." };

const PURPLE_TEXTS = [
  { id: "p9-sandcastle", band: 9, title: "The Great Sandcastle", type: "Story", text: [
      "Last Saturday, Aisha and her brother Zayd went to the beach with their grandparents. The sun was shining and the waves were crashing on the shore.",
      "They wanted to build the biggest sandcastle on the beach, but the sand was too dry. It kept falling down! Zayd fetched water in a bucket, and Aisha patted the wet sand into towers. Grandpa dug a deep moat around the castle, and Grandma collected shells for a bridge.",
      "By lunchtime, the castle had four towers, a moat and a bridge made of shells. People were stopping to look at it. A little boy asked, \"Can I help?\" \"Yes, of course!\" said Aisha.",
      "Suddenly, a huge wave rushed up the beach. Was the castle going to fall? Everyone was holding their breath. The water filled the moat, but the towers stood strong. Aisha and Zayd cheered, and the little boy jumped up and down.",
      "\"Shall we build another one, or shall we have lunch?\" asked Zayd. Aisha laughed. \"Lunch first, then an even bigger castle!\""],
    vocab: { moat: "a ditch of water around a castle", fetched: "went and brought back", shore: "the land at the edge of the sea" },
    questions: [["Why did they need water?", ["The sand was too dry.", "They were thirsty.", "They wanted to swim."], 0, "retrieval"], ["What did Grandma collect?", ["shells for a bridge", "water in a bucket", "towels"], 0, "retrieval"],
      ["\"Everyone was holding their breath.\" This tells us they were…", ["nervous, waiting to see what would happen", "swimming under the water", "very tired"], 0, "inference"], ["What does \"moat\" mean?", ["a ditch of water around a castle", "a tall tower", "a kind of boat"], 0, "vocabulary"], ["What will they probably do next?", ["Have lunch, then build a bigger castle", "Go straight home", "Knock the castle down"], 0, "prediction"]],
    grammar: Object.assign({}, PCOORD, { spots: ["but the sand was too dry", "and Aisha patted the wet sand into towers", "but the towers stood strong", "or shall we have lunch"],
      practice: [["Which word fits? \"I wanted to swim, ___ the water was cold.\"", ["but", "or", "if"], 0], ["Which word fits? \"Would you like juice ___ water?\"", ["or", "but", "so"], 0], ["Which word fits? \"Zayd fetched water ___ Aisha built the towers.\"", ["and", "if", "than"], 0]] }) },
  { id: "p9-lights", band: 9, title: "The Night the Lights Went Out", type: "Story", text: [
      "It was a stormy evening. Rain was drumming on the roof and the wind was howling outside.",
      "Inside, the Haddad family were getting ready for dinner. Mum was cooking rice, Dad was laying the table and Sami was finishing his homework. His little sister Lina was playing with her blocks on the rug.",
      "Suddenly, there was a loud crack of thunder, and all the lights went out! Lina screamed. \"I can't see anything!\"",
      "\"Don't worry,\" said Dad calmly. \"I know where the torches are.\" He felt his way along the wall to the kitchen drawer. A moment later, a beam of light was shining across the room. Mum found some candles, and soon the room was glowing with warm, golden light.",
      "\"Let's have a candlelit dinner,\" said Mum. While they were eating, Sami told a funny story about a cat who was scared of mice. Everyone was laughing so much that they didn't notice when the lights came back on!",
      "\"Can we have a power cut every night?\" asked Lina."],
    vocab: { howling: "making a long, loud, wild sound", calmly: "in a quiet way, without worrying", glowing: "shining with a soft, warm light" },
    questions: [["What was Mum doing before the lights went out?", ["cooking rice", "laying the table", "playing with blocks"], 0, "retrieval"], ["What made the lights go out?", ["a loud crack of thunder in the storm", "Sami switched them off", "Lina pulled a plug"], 0, "retrieval"],
      ["How did Dad find the torches in the dark?", ["He felt his way along the wall.", "He lit a candle first.", "Lina showed him."], 0, "retrieval"], ["Why didn't they notice the lights come back on?", ["They were laughing so much.", "They were asleep.", "They had their eyes closed."], 0, "inference"], ["How did Lina feel about the power cut by the end?", ["She enjoyed it.", "She was still scared.", "She was angry with Sami."], 0, "inference"]],
    grammar: Object.assign({}, PPROG, { spots: ["Rain was drumming", "the wind was howling", "Mum was cooking rice", "Dad was laying the table", "Lina was playing", "was shining", "were eating", "Everyone was laughing"],
      practice: [["Which fits? \"While Dad ___ the table, Mum cooked rice.\"", ["was laying", "is lay", "lays"], 0], ["Which sentence tells us what was happening?", ["The rain was drumming on the roof.", "The lights went out.", "Lina screamed."], 0], ["Change to the past progressive: \"Sami plays with his blocks.\"", ["Sami was playing with his blocks.", "Sami were playing with his blocks.", "Sami is play with his blocks."], 0]] }) },
  { id: "p9-shoe", band: 9, title: "Max and the Missing Shoe", type: "Story", text: [
      "Max was late for school. He had his bag and his coat, but he could only find one shoe!",
      "\"Where is my other shoe?\" he groaned. He looked under the bed, but it wasn't there. He looked in the cupboard and behind the door, but he still couldn't find it.",
      "\"Is it in the garden, or did you leave it in the car?\" asked Mum. Max ran outside. He checked the car and the garden, but there was no shoe.",
      "Then he heard a strange noise coming from the dog's basket. Grrr… chomp… grrr… Max peeped into the basket. There was Biscuit, the puppy, and there was the missing shoe! Biscuit was chewing the laces and wagging his tail.",
      "\"Biscuit!\" laughed Max. \"You can play with your ball, or you can play with your bone, but you can't play with my shoe!\"",
      "Max wiped the shoe and put it on. It was a bit wet, but it was fine. That afternoon, Max put both of his shoes on a high shelf, and Biscuit got a new chew toy."],
    vocab: { groaned: "made a long, unhappy sound", peeped: "looked quickly and quietly", laces: "the strings that tie a shoe" },
    questions: [["How many shoes could Max find at first?", ["one", "two", "none"], 0, "retrieval"], ["Where was the missing shoe?", ["in the dog's basket", "in the car", "under the bed"], 0, "retrieval"],
      ["Who is Biscuit?", ["Max's puppy", "Max's brother", "Max's teacher"], 0, "retrieval"], ["Why did Max put his shoes on a high shelf?", ["so Biscuit couldn't reach them", "to dry them", "to keep them clean for school"], 0, "inference"], ["What does \"groaned\" mean?", ["made a long, unhappy sound", "jumped high", "laughed quietly"], 0, "vocabulary"]],
    grammar: Object.assign({}, PCOORD, { spots: ["but he could only find one shoe", "but it wasn't there", "or did you leave it in the car", "or you can play with your bone", "but you can't play with my shoe", "but it was fine"],
      practice: [["Which word shows a choice? \"Is it in the garden, or in the car?\"", ["or", "in", "the"], 0], ["Which word fits? \"He looked under the bed, ___ it wasn't there.\"", ["but", "or", "if"], 0], ["Which word fits? \"You can have an apple ___ a pear.\"", ["or", "but", "so"], 0]] }) },
  { id: "p9-firstday", band: 9, title: "Noor's First Day", type: "Story", text: [
      "Noor stood at the classroom door and held her mum's hand tightly. It was her first day at a new school, and her tummy felt full of butterflies. \"What if nobody talks to me?\" she whispered.",
      "Just then, a girl with curly hair walked over. \"Hi! I'm Hana,\" she said with a big smile. \"Do you want to sit next to me?\" Noor nodded. She waved goodbye to Mum and followed Hana to a table by the window.",
      "In the morning, the class painted pictures of their families. Noor painted her mum, her dad and her baby brother. Hana painted her three cats! At break time, they played hopscotch together, and Hana showed Noor where the library was.",
      "After lunch, the teacher read a story about a little owl who was afraid of the dark. Noor listened carefully and answered a question. \"Well done, Noor!\" said the teacher.",
      "At home time, Mum asked, \"How was your first day?\" Noor grinned. \"It was brilliant. Can I come back tomorrow?\""],
    vocab: { tightly: "holding on very hard", nodded: "moved her head up and down to say yes", grinned: "gave a big smile", brilliant: "really great" },
    questions: [["How did Noor feel when she arrived?", ["nervous", "angry", "bored"], 0, "inference"], ["Who is Hana?", ["a girl who becomes Noor's friend", "Noor's sister", "the teacher"], 0, "retrieval"],
      ["What did Hana paint?", ["her three cats", "her family", "an owl"], 0, "retrieval"], ["\"Her tummy felt full of butterflies.\" This means she felt…", ["nervous", "hungry", "sick"], 0, "vocabulary"], ["How did Noor feel at the end of the day?", ["happy, and wanting to come back", "tired and sad", "worried about tomorrow"], 0, "inference"]],
    grammar: Object.assign({}, PPAST, { spots: ["stood", "walked", "nodded", "waved", "followed", "painted", "played", "listened", "answered", "grinned"],
      practice: [["Change to the past tense: \"Noor waves goodbye.\"", ["Noor waved goodbye.", "Noor waving goodbye.", "Noor wave goodbye."], 0], ["Which fits? \"Yesterday, Hana ___ a picture of her cats.\"", ["painted", "paints", "painting"], 0], ["Which verb is in the past tense?", ["followed", "follow", "follows"], 0]] }) },
  { id: "p9-butterfly", band: 9, title: "The Life Cycle of a Butterfly", type: "Information", text: [
      "A butterfly goes through four stages in its life. This is called a life cycle.",
      "1. Egg: A female butterfly lays tiny eggs on a leaf. She chooses a plant that the baby caterpillars will like to eat.",
      "2. Caterpillar: After a few days, a caterpillar hatches from each egg. The caterpillar is very hungry! It eats and eats, and it grows bigger and bigger. As it grows, it sheds its skin several times.",
      "3. Chrysalis: When the caterpillar is fully grown, it hangs from a twig and makes a hard case around itself. This case is called a chrysalis. Inside, the caterpillar slowly changes. This can take one or two weeks.",
      "4. Butterfly: At last, the chrysalis splits open and a butterfly crawls out. Its wings are soft and crumpled at first, so it rests and lets them dry in the sun. Then it flies away to find flowers.",
      "Later, the butterfly lays eggs of its own, and the life cycle starts again."],
    vocab: { stages: "steps or parts, one after another", hatches: "comes out of an egg", sheds: "lets something fall off", crumpled: "creased and folded" },
    questions: [["How many stages are in a butterfly's life cycle?", ["four", "three", "two"], 0, "retrieval"], ["What is the hard case called?", ["a chrysalis", "a cocoon of leaves", "an egg"], 0, "retrieval"],
      ["Why does the mother butterfly choose a special plant?", ["so the caterpillars have food to eat", "so the eggs are hidden from rain", "so she can rest"], 0, "inference"], ["Which stage comes after the caterpillar?", ["chrysalis", "egg", "butterfly"], 0, "sequencing"], ["Why does the new butterfly rest at first?", ["Its wings are soft and need to dry.", "It is hungry.", "It is looking for eggs."], 0, "retrieval"]],
    grammar: Object.assign({}, PPRESENT, { spots: ["lays", "chooses", "hatches", "eats", "grows", "hangs", "changes", "splits", "crawls", "flies"],
      practice: [["Which fits? \"A caterpillar ___ leaves.\"", ["eats", "ate", "eaten"], 0], ["Which sentence is in the present tense?", ["The butterfly flies away.", "The butterfly flew away.", "The butterfly was flying away."], 0], ["Information texts are usually written in the…", ["present tense", "past tense", "future tense"], 0]] }) },
  { id: "p9-rubbish", band: 9, title: "Where Does Our Rubbish Go?", type: "Information", text: [
      "Every day, families throw away lots of rubbish. Some of it goes to big holes in the ground called landfill sites, but some of it can be recycled.",
      "Recycling means turning old things into new things. Paper and cardboard can become new boxes and newspapers. Plastic bottles can become new bottles, or they can even be turned into warm fleece jackets! Glass jars can be melted and made into new jars.",
      "Recycling is good for our planet. It saves energy, and it means we cut down fewer trees. It also keeps rubbish out of the sea, where it can hurt fish and turtles.",
      "You can help at home and at school. Rinse your bottles and jars, and put them in the recycling bin. You can reuse a bag, or you can take your own bottle to school. Food scraps cannot be recycled with paper, but they can be made into compost for the garden.",
      "Remember the three Rs: reduce, reuse and recycle!"],
    vocab: { recycled: "made into something new", rinse: "wash quickly with water", compost: "rotted food and plants that feed the soil" },
    questions: [["What is a landfill site?", ["a big hole in the ground for rubbish", "a recycling bin", "a park"], 0, "retrieval"], ["What can plastic bottles be turned into?", ["fleece jackets", "glass jars", "newspapers"], 0, "retrieval"],
      ["Why is rubbish in the sea a problem?", ["It can hurt fish and turtles.", "It makes the sea too cold.", "It stops the waves."], 0, "retrieval"], ["What does \"rinse\" mean?", ["wash quickly with water", "throw away", "break into pieces"], 0, "vocabulary"], ["What are the three Rs?", ["reduce, reuse and recycle", "rinse, run and rest", "read, write and recycle"], 0, "summarising"]],
    grammar: Object.assign({}, PCOORD, { spots: ["but some of it can be recycled", "or they can even be turned into warm fleece jackets", "and it means we cut down fewer trees", "or you can take your own bottle to school", "but they can be made into compost"],
      practice: [["Which word joins two choices? \"You can walk to school ___ ride a bike.\"", ["or", "but", "if"], 0], ["Which word fits? \"Paper can be recycled, ___ food scraps cannot.\"", ["but", "or", "so"], 0], ["Which word fits? \"Rinse your bottles ___ put them in the bin.\"", ["and", "or", "but"], 0]] }) },
  { id: "p9-aquarium", band: 9, title: "Our Trip to the Aquarium", type: "Recount", text: [
      "On Tuesday, Class 2B went on a trip to the aquarium. We travelled there on a big blue coach.",
      "When we arrived, a guide called Mr Khalid met us at the entrance. First, he took us through a glass tunnel. Sharks and rays swam right over our heads! A huge turtle glided past, and Omar shouted, \"Look! It's waving at us!\"",
      "Next, we visited the rock pool. We gently touched a starfish with two fingers. It felt rough and bumpy. Mr Khalid explained that starfish can grow back a lost arm.",
      "After that, we watched the penguins having their lunch. One cheeky penguin stole a fish from his friend!",
      "Finally, we ate our packed lunches in the garden and drew pictures of our favourite sea creatures. I drew a jellyfish with long, wavy tentacles.",
      "We arrived back at school at three o'clock. It was the best trip ever, and I learned that the ocean is full of amazing animals."],
    vocab: { guide: "a person who shows visitors around", glided: "moved along smoothly and easily", tentacles: "long, bendy arms of a sea animal" },
    questions: [["How did the class travel to the aquarium?", ["on a coach", "by train", "on foot"], 0, "retrieval"], ["What did they touch in the rock pool?", ["a starfish", "a turtle", "a penguin"], 0, "retrieval"],
      ["What did the cheeky penguin do?", ["stole a fish from his friend", "waved at the children", "swam through the tunnel"], 0, "retrieval"], ["What did the class do first?", ["walked through a glass tunnel", "ate their packed lunches", "watched the penguins"], 0, "sequencing"], ["How did the writer feel about the trip?", ["They loved it.", "They were bored.", "They were scared."], 0, "inference"]],
    grammar: Object.assign({}, PPAST, { spots: ["travelled", "arrived", "met", "took", "swam", "glided", "visited", "touched", "explained", "watched", "stole", "drew"],
      practice: [["Which word is in the past tense?", ["visited", "visit", "visiting"], 0], ["Which fits? \"Yesterday we ___ the penguins.\"", ["watched", "watch", "watches"], 0], ["Some past tense verbs don't end in -ed. What is the past tense of \"swim\"?", ["swam", "swimmed", "swims"], 0]] }) },
  { id: "p9-bees", band: 9, title: "Busy Bees", type: "Information", text: [
      "Look inside a beehive and you will find thousands of bees. Every bee has a job, and right now they are all working hard!",
      "In the middle of the hive, the queen bee is laying eggs. She can lay over a thousand eggs in one day!",
      "Around her, young worker bees are cleaning the cells and feeding the baby bees, called larvae. Other bees are building new wax cells. They make the wax from their own bodies.",
      "Outside, older worker bees are flying from flower to flower. They are collecting nectar, a sweet juice, and carrying pollen on their back legs. When they return, they pass the nectar to other bees, who turn it into honey.",
      "At the entrance, guard bees are watching carefully. They are checking that no strangers come in.",
      "Bees are very important. As they fly from flower to flower, they are helping plants to make seeds and fruit. Without bees, we would have much less food to eat."],
    vocab: { larvae: "baby insects that look like small worms", nectar: "a sweet juice inside flowers", entrance: "the way in" },
    questions: [["What is the queen bee doing?", ["laying eggs", "making wax", "guarding the door"], 0, "retrieval"], ["What are baby bees called?", ["larvae", "drones", "cells"], 0, "retrieval"],
      ["What do bees make honey from?", ["nectar", "wax", "pollen"], 0, "retrieval"], ["What is the job of the guard bees?", ["to check that no strangers come in", "to feed the larvae", "to collect nectar"], 0, "retrieval"], ["Why are bees important to us?", ["They help plants make seeds and fruit.", "They keep strangers away.", "They make wax for candles."], 0, "inference"]],
    grammar: Object.assign({}, PPROG, { spots: ["are all working", "is laying", "are cleaning", "are flying", "are collecting", "are watching", "are checking", "are helping"],
      practice: [["Which fits? \"The bees ___ honey right now.\"", ["are making", "makes", "made"], 0], ["Which fits? \"The queen ___ eggs at the moment.\"", ["is laying", "are laying", "laying"], 0], ["Which sentence tells us what is happening now?", ["The guard bees are watching the door.", "The guard bees watched the door.", "The guard bees will watch the door."], 0]] }) },
  { id: "p9-street", band: 9, title: "The Busy Street", type: "Poem", text: [
      "The baker's baking loaves of bread,",
      "The painter's painting doors bright red,",
      "The postman's whistling down the lane,",
      "The cars are honking once again.",
      "The children are skipping, two by two,",
      "The puppy's chasing someone's shoe,",
      "The rain is falling, splish, splash, splosh,",
      "And everyone is getting washed!"],
    vocab: { loaves: "more than one loaf of bread", lane: "a narrow road", honking: "making a loud horn sound" },
    questions: [["What colour is the painter painting the doors?", ["red", "blue", "green"], 0, "retrieval"], ["What is the puppy chasing?", ["someone's shoe", "a cat", "the postman"], 0, "retrieval"],
      ["Which words sound like the rain?", ["splish, splash, splosh", "two by two", "once again"], 0, "language"], ["What happens to everyone at the end?", ["They get wet in the rain.", "They go to sleep.", "They buy bread."], 0, "inference"], ["Where is the postman whistling?", ["down the lane", "in the bakery", "on the bus"], 0, "retrieval"]],
    grammar: Object.assign({}, PPROG, { spots: ["are honking", "are skipping", "is falling", "is getting"],
      practice: [["\"The baker's baking\" means…", ["The baker is baking.", "The baker was baking.", "The baker bakes."], 0], ["Which fits? \"The children ___ skipping.\"", ["are", "is", "am"], 0], ["Which line tells us what is happening now?", ["The rain is falling.", "The rain fell.", "The rain will fall."], 0]] }) },
  { id: "p9-choices", band: 9, title: "This or That?", type: "Poem", text: [
      "Shall I wear my red jumper, or my blue?",
      "Shall I have some toast, or porridge too?",
      "Shall I play football, or ride my bike?",
      "Shall I read a book, or go for a hike?",
      "I could build a den, or bake a cake,",
      "Or paddle my boat across the lake.",
      "So many choices, what shall I do?",
      "I'll do them all, and you can come too!"],
    vocab: { porridge: "a warm breakfast made with oats", hike: "a long walk in the countryside", den: "a small hiding place you build" },
    questions: [["What colours could the jumper be?", ["red or blue", "green or yellow", "black or white"], 0, "retrieval"], ["Where would the child paddle the boat?", ["across the lake", "down the river", "in the sea"], 0, "retrieval"],
      ["What does the child decide at the end?", ["to do all of them", "to stay in bed", "to go for a hike only"], 0, "retrieval"], ["What does \"hike\" mean?", ["a long walk in the countryside", "a fast bike ride", "a kind of game"], 0, "vocabulary"], ["Why does the poem ask so many questions?", ["The child is trying to choose what to do.", "The child is lost.", "The child is angry."], 0, "inference"]],
    grammar: Object.assign({}, PCOORD, { spots: ["or my blue", "or porridge too", "or ride my bike", "or go for a hike", "or bake a cake", "and you can come too"],
      practice: [["Which word shows a choice?", ["or", "and", "but"], 0], ["Which word fits? \"Do you want toast ___ porridge?\"", ["or", "but", "so"], 0], ["Which word fits? \"I'll do them all, ___ you can come too!\"", ["and", "or", "but"], 0]] }) }
];


TEST_A[9] = PURPLE_A; TEST_B[9] = PURPLE_B; TEXTS.push(...PURPLE_TEXTS);
