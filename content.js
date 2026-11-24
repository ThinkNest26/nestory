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
  6: { title: "The Lost Kite", text: [
      "Ben had a red kite. One windy day, he took it to the park with Dad. The kite went up and up. It danced in the sky like a bird.",
      "Then the string slipped out of Ben's hand! The kite flew over the trees. Ben was sad. Dad held his hand and they looked and looked.",
      "At last they found the kite in a big bush. Ben hugged it tight. \"I will hold on next time,\" he said."],
    q: [["What colour was Ben's kite?", ["red", "blue", "green"], 0, "retrieval"],
        ["What happened after the string slipped?", ["The kite flew over the trees.", "They went home for lunch.", "Ben flew the kite again."], 0, "sequencing"],
        ["How did Ben feel when they found the kite?", ["happy", "angry", "sleepy"], 0, "inference"],
        ["\"It danced in the sky.\" This means the kite…", ["moved about happily", "fell to the ground", "stayed very still"], 0, "vocabulary"]] },
  9: { title: "Hedgehogs", text: [
      "Hedgehogs are small mammals with about 5,000 sharp spines on their backs. When a hedgehog is frightened, it rolls into a tight ball so that its spines point outwards. This protects its soft tummy from predators such as foxes and badgers.",
      "Hedgehogs are nocturnal, which means they sleep during the day and search for food at night. They eat beetles, worms, caterpillars and slugs, so gardeners are often pleased to see them.",
      "In winter, food is hard to find. Hedgehogs build nests of leaves and hibernate until spring. While they hibernate, their hearts beat very slowly and they use the fat they stored in autumn.",
      "You can help hedgehogs by leaving a small gap under your garden fence, so they can travel safely between gardens."],
    q: [["What does a hedgehog do when it is frightened?", ["It rolls into a tight ball.", "It climbs up a tree.", "It hides in a pond."], 0, "retrieval"],
        ["What does \"nocturnal\" mean?", ["active at night", "very small", "covered in spines"], 0, "vocabulary"],
        ["Why are gardeners pleased to see hedgehogs?", ["They eat slugs and insects that harm plants.", "They dig holes for planting.", "They keep foxes away from houses."], 0, "inference"],
        ["What do hedgehogs live on while they hibernate?", ["fat they stored in autumn", "worms they find at night", "leaves from their nest"], 0, "retrieval"],
        ["Which is the best heading for the last paragraph?", ["How you can help hedgehogs", "What hedgehogs eat", "Hedgehogs in winter"], 0, "summarising"]] },
  12: { title: "The Lighthouse Keeper's Daughter", text: [
      "Every evening, Noor climbed the hundred and twelve steps of the lighthouse to help her father light the great lamp. Tonight, however, he was ill in bed, and the storm outside was growing fiercer by the minute.",
      "Noor pressed her face against the cold window. Far out at sea, a tiny light was rising and falling with the waves. A fishing boat! Without the lighthouse beam, it would never find its way past the rocks.",
      "Her heart was pounding as she started to climb. Her legs ached and the wind howled through the cracks in the walls, but she did not stop. At the top, her fingers trembled as she struck the match. Once, twice… on the third try, the wick caught, and a golden beam swept across the black water.",
      "Noor watched as the little boat turned slowly away from the rocks and towards the safety of the harbour. When she finally crept back downstairs, her father was awake. \"I saw the light,\" he whispered with a smile. \"I knew it was you.\""],
    q: [["Why couldn't Noor's father light the lamp?", ["He was ill in bed.", "He was out at sea.", "He had lost the matches."], 0, "retrieval"],
        ["How did Noor feel as she climbed the steps?", ["nervous but determined", "bored and sleepy", "angry with her father"], 0, "inference"],
        ["What does \"fiercer\" mean in the first paragraph?", ["stronger and more violent", "quieter and calmer", "colder and wetter"], 0, "vocabulary"],
        ["\"The wind howled through the cracks.\" This makes the storm seem…", ["wild and frightening", "gentle and peaceful", "funny and playful"], 0, "language"],
        ["Which sentence best sums up the story?", ["Noor bravely lights the lamp and saves a fishing boat.", "Noor learns how to sail a fishing boat.", "A fishing boat sinks during a storm."], 0, "summarising"]] },
  15: { title: "Should Zoos Exist?", text: [
      "For more than two hundred years, zoos have allowed people to see animals from every corner of the world. Today, however, many people question whether keeping wild animals in captivity can ever be fair.",
      "Supporters argue that modern zoos play a vital role in conservation. Breeding programmes have helped to save species such as the Arabian oryx, which had disappeared from the wild by 1972 but has since been successfully returned to the deserts of the Arabian Peninsula. Zoos also fund research and inspire millions of visitors, especially children, to care about wildlife.",
      "Critics, on the other hand, point out that even the most spacious enclosure is tiny compared with an animal's natural range. Elephants, for example, may walk many kilometres a day in the wild. Some animals in captivity develop repetitive behaviours, such as pacing, which may be a sign of stress. Critics believe the money spent on zoos would be better used to protect habitats directly.",
      "Perhaps the answer lies somewhere in between. If zoos focus on species that genuinely benefit from protection, and give animals space to behave naturally, they may continue to earn their place in the modern world."],
    q: [["Which animal was returned to the wild thanks to breeding programmes?", ["the Arabian oryx", "the African elephant", "the polar bear"], 0, "retrieval"],
        ["What does \"captivity\" mean?", ["being kept in an enclosed place", "living freely in the wild", "being very old"], 0, "vocabulary"],
        ["Why does the writer mention pacing?", ["as possible evidence that animals are stressed", "to show that zoo animals are healthy", "to describe how elephants find food"], 0, "inference"],
        ["Why does the writer use \"on the other hand\" in the third paragraph?", ["to introduce the opposite point of view", "to give an example of a zoo", "to show the text is ending"], 0, "structure"],
        ["What is the writer's conclusion?", ["Zoos can be justified if they protect species and give animals space.", "All zoos should close as soon as possible.", "Zoos are perfect and should not change."], 0, "summarising"]] }
};

/* ---------------- Reading texts ----------------
   Each text: id, band, title, type, text (paragraphs), vocab {word: meaning},
   questions [q, options, answer, skill], grammar {focus, explain, spots [phrases in the text], practice [q, options, answer]} */
const TEXTS = [
  { id: "g6-pip", band: 6, title: "Pip the Puppy", type: "Story", text: [
      "Pip is a little puppy. He has a red ball and a blue bone. Every day, Pip runs in the garden and digs in the mud.",
      "Pip likes foxes, boxes and buses! One day, Pip saw two cats on the wall. He barked and barked. The cats jumped down and ran away.",
      "Pip was so proud. Then Mum called him in for tea and a big hug."],
    vocab: { proud: "pleased with yourself", barked: "made the loud sound a dog makes" },
    questions: [["What colour is Pip's ball?", ["red", "blue", "green"], 0, "retrieval"], ["Where does Pip dig?", ["in the mud", "in the bath", "on the bus"], 0, "retrieval"],
      ["Why did the cats run away?", ["Pip barked at them.", "It started to rain.", "They wanted their tea."], 0, "inference"], ["How did Pip feel at the end?", ["proud", "scared", "cross"], 0, "inference"]],
    grammar: { focus: "Joining with 'and' · plurals -s and -es", explain: "We use 'and' to join two ideas. To make a word mean more than one, we add -s, or -es after x, s, sh and ch.",
      spots: ["runs in the garden and digs in the mud", "foxes, boxes and buses", "jumped down and ran away"],
      practice: [["Which word joins the two ideas? \"The cats jumped down and ran away.\"", ["and", "cats", "down"], 0], ["One fox, two ___", ["foxes", "foxs", "fox"], 0], ["One cat, two ___", ["cats", "cates", "cat"], 0]] } },
  { id: "p9-sandcastle", band: 9, title: "The Great Sandcastle", type: "Story", text: [
      "Last Saturday, Aisha and her brother Zayd went to the beach. The sun was shining and the waves were crashing on the shore.",
      "They wanted to build the biggest sandcastle on the beach, but the sand was too dry. Zayd fetched water in a bucket, and Aisha patted the wet sand into towers. By lunchtime, the castle had four towers, a moat and a bridge made of shells.",
      "Suddenly, a huge wave rushed up the beach. Was the castle going to fall? The water filled the moat, but the towers stood strong. Aisha and Zayd cheered.",
      "\"Shall we build another one, or shall we have lunch?\" asked Zayd. Aisha laughed. \"Lunch first, then a bigger castle!\""],
    vocab: { moat: "a ditch of water around a castle", fetched: "went and brought back", shore: "the land at the edge of the sea" },
    questions: [["Why did Zayd fetch water?", ["The sand was too dry.", "He was thirsty.", "He wanted to swim."], 0, "retrieval"], ["What was the bridge made of?", ["shells", "stones", "sticks"], 0, "retrieval"],
      ["How did they feel when the towers stood strong?", ["relieved and happy", "sad and tired", "angry and cross"], 0, "inference"], ["What will they probably do next?", ["Have lunch, then build a bigger castle", "Go straight home", "Knock the castle down"], 0, "prediction"]],
    grammar: { focus: "Past progressive tense · joining with and, but, or", explain: "The past progressive tells us what was happening: 'was shining', 'were crashing'. We join ideas with 'and', 'but' (for a contrast) and 'or' (for a choice).",
      spots: ["was shining", "were crashing", "but the sand was too dry", "or shall we have lunch"],
      practice: [["Choose the past progressive: \"The children ___ in the sea.\"", ["were swimming", "are swim", "swims"], 0], ["Which word fits? \"I wanted to swim, ___ the water was cold.\"", ["but", "or", "if"], 0], ["Which word fits? \"Would you like juice ___ water?\"", ["or", "but", "so"], 0]] } },
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
