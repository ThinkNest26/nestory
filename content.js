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

/* =================== LIME BAND: full set =================== */
/* LIME BAND (12) · Year 3 · reading age 8y–8y6m · after RWI
   Grammar: present perfect tense; word families; inverted commas for direct speech */
const LIME_A = [
  ["The forecast predicted heavy rain, so the match was ___.", ["postponed", "possessed", "positioned", "polished"], 0],
  ["Bees play an important role in ___ flowers.", ["pollinating", "polluting", "populating", "polishing"], 0],
  ["The knight's armour was so ___ that he could hardly walk.", ["heavy", "hollow", "humble", "hasty"], 0],
  ["Instead of arguing, the two friends decided to ___ the problem calmly.", ["discuss", "disguise", "dismiss", "distract"], 0],
  ["The explorers packed enough food for the long ___.", ["journey", "jersey", "journal", "jewel"], 0],
  ["The museum had an ___ of dinosaur bones.", ["exhibition", "expedition", "explanation", "examination"], 0],
  ["Please ___ the instructions carefully before you begin.", ["follow", "swallow", "hollow", "borrow"], 0],
  ["The magician made the coin ___ into thin air.", ["vanish", "varnish", "banish", "polish"], 0],
  ["Lightning ___ the old tree in half.", ["split", "spilt", "spit", "spin"], 0],
  ["The children ___ patiently for their parents to collect them.", ["waited", "weighted", "wasted", "wanted"], 0],
  ["The puppy was ___ of the loud fireworks.", ["terrified", "terrific", "territory", "terrible"], 0],
  ["The athlete ___ across the finish line.", ["sprinted", "splinted", "printed", "spirited"], 0],
  ["We used a ___ to look closely at the tiny insect.", ["magnifying glass", "measuring jug", "mixing bowl", "map"], 0],
  ["The storm caused ___ damage to the roofs.", ["serious", "curious", "furious", "glorious"], 0],
  ["Grandpa told us a story about his ___.", ["childhood", "chilly", "chimney", "cheerful"], 0],
  ["The recipe says to ___ the eggs and sugar together.", ["whisk", "whisper", "whistle", "wish"], 0],
  ["The library ___ late on Thursdays.", ["closes", "clothes", "closets", "clues"], 0],
  ["The ___ at the zoo fed the lions.", ["keeper", "keeping", "kept", "keen"], 0],
  ["It was ___ to tell who had won, because both runners finished together.", ["impossible", "imaginary", "important", "impatient"], 0],
  ["The scientist ___ the results in her notebook.", ["recorded", "reminded", "rewarded", "retired"], 0],
  ["The children worked ___ to finish the model.", ["together", "tomorrow", "towards", "tonight"], 0],
  ["The tiny seed grew into an ___ oak tree.", ["enormous", "anxious", "famous", "nervous"], 0],
  ["Our class ___ a letter to the mayor about the park.", ["wrote", "rode", "rote", "wrought"], 0],
  ["The lost hiker followed the river to find his way ___.", ["home", "hole", "hose", "hope"], 0],
  ["Mina's ___ made everyone laugh.", ["joke", "jolly", "jog", "journey"], 0],
  ["The guard ___ the gate every night.", ["locked", "looked", "licked", "lacked"], 0],
  ["The kitten ___ out in the warm sunshine.", ["stretched", "sketched", "starched", "stitched"], 0],
  ["Before the race, the runners ___ their muscles.", ["warmed up", "woke up", "washed up", "wound up"], 0],
  ["The volcano ___ hot lava down the mountain.", ["poured", "powered", "pored", "paused"], 0],
  ["After the long walk, we were ___ and hungry.", ["exhausted", "exciting", "expensive", "exact"], 0]
];

const LIME_B = [
  { title: "The Lighthouse Keeper's Daughter", text: [
      "Every evening, Noor climbed the hundred and twelve steps of the lighthouse to help her father light the great lamp. Tonight, however, he was ill in bed, and the storm outside was growing fiercer by the minute.",
      "Noor pressed her face against the cold window. Far out at sea, a tiny light was rising and falling with the waves. A fishing boat! Without the lighthouse beam, it would never find its way past the rocks.",
      "Her heart was pounding as she started to climb. Her legs ached and the wind howled through the cracks in the walls, but she did not stop. At the top, her fingers trembled as she struck the match. Once, twice… on the third try, the wick caught, and a golden beam swept across the black water.",
      "Noor watched as the little boat turned slowly away from the rocks and towards the safety of the harbour. When she finally crept back downstairs, her father was awake. \"I saw the light,\" he whispered with a smile. \"I knew it was you.\""],
    q: [["Why couldn't Noor's father light the lamp?", ["He was ill in bed.", "He was out at sea.", "He had lost the matches."], 0, "retrieval"],
        ["How did Noor feel as she climbed the steps?", ["nervous but determined", "bored and sleepy", "angry with her father"], 0, "inference"],
        ["What does \"fiercer\" mean in the first paragraph?", ["stronger and more violent", "quieter and calmer", "colder and wetter"], 0, "vocabulary"],
        ["\"The wind howled through the cracks.\" This makes the storm seem…", ["wild and frightening", "gentle and peaceful", "funny and playful"], 0, "language"],
        ["Which sentence best sums up the story?", ["Noor bravely lights the lamp and saves a fishing boat.", "Noor learns how to sail a fishing boat.", "A fishing boat sinks during a storm."], 0, "summarising"]] },
  { title: "Coral Reefs", text: [
      "Coral reefs are sometimes called the rainforests of the sea. Although they cover less than one per cent of the ocean floor, they are home to about a quarter of all sea creatures.",
      "A coral reef might look as if it is made of colourful rocks, but coral is actually alive. Each piece is made of thousands of tiny animals called polyps. Polyps build hard skeletons around themselves, and over hundreds of years these skeletons join together to form a reef.",
      "Reefs give food and shelter to fish, turtles, crabs and sea stars. They also protect coastlines by breaking up big waves before they reach the shore.",
      "Sadly, many reefs are in danger. When the sea becomes too warm, coral turns white and can die. This is called coral bleaching. Pollution and careless fishing can also harm reefs.",
      "Scientists around the world, including in the UAE, are working to protect reefs by growing new coral and returning it to the sea."],
    q: [["What is coral made of?", ["thousands of tiny animals called polyps", "colourful rocks", "seaweed and sand"], 0, "retrieval"],
        ["What does \"shelter\" mean?", ["a safe place to stay", "a kind of fish", "a big wave"], 0, "vocabulary"],
        ["Why are reefs called \"the rainforests of the sea\"?", ["They are home to a huge number of living things.", "It rains a lot over reefs.", "Trees grow on them."], 0, "inference"],
        ["What is coral bleaching?", ["when coral turns white because the sea is too warm", "when people clean the coral", "when coral grows very fast"], 0, "retrieval"],
        ["What is the main idea of the last paragraph?", ["People are working to protect reefs.", "Reefs are made of rock.", "Fish live on reefs."], 0, "summarising"]] },
  { title: "The Old Bookshop", text: [
      "Down a crooked cobbled lane",
      "Where the lamplight glows,",
      "There's a dusty little bookshop",
      "That nobody knows.",
      "Its shelves are bent with stories,",
      "Its windows thick with grime,",
      "And every book is waiting",
      "For someone to give it time.",
      "I opened one on dragons,",
      "I opened one on space,",
      "And when I looked up from the page",
      "I'd travelled every place."],
    q: [["Where is the bookshop?", ["down a crooked cobbled lane", "in a busy shopping centre", "next to the school"], 0, "retrieval"],
        ["What does \"grime\" mean?", ["dirt", "paint", "glass"], 0, "vocabulary"],
        ["\"Every book is waiting for someone to give it time.\" This means…", ["The books are waiting to be read.", "The books are late.", "The books are broken."], 0, "inference"],
        ["\"Its shelves are bent with stories\" tells us that…", ["there are lots of heavy books", "the shelves are made of paper", "the stories are about shelves"], 0, "language"],
        ["What do the last two lines mean?", ["Reading took the child to many places in their imagination.", "The child went on a long holiday.", "The child got lost in the shop."], 0, "inference"]] }
];

const LPERF = { focus: "Present perfect tense", explain: "The present perfect uses has or have with a past form of the verb (has grown, have found). It tells us about something that happened in the past and still matters now." };
const LSPEECH = { focus: "Inverted commas for speech", explain: "Inverted commas (\" \") go around the exact words someone says. The punctuation at the end of the spoken words goes inside the inverted commas: \"Wait for me,\" said Ella. Start a new line when a new person speaks." };
const LFAM = { focus: "Word families", explain: "A word family is a group of words that share the same root word, like perform, performer and performance. If you know one word in the family, it helps you understand the others." };

const LIME_TEXTS = [
  { id: "l12-neighbour", band: 12, title: "The New Neighbour", type: "Story", text: [
      "Mr Okafor has lived at number 12 for forty years. He has grown tomatoes in his garden every summer, and he has never missed a single day of watering them. So when a removal van arrived next door, he peered over the fence with great curiosity.",
      "A girl with a tool belt jumped down from the van. \"Hello!\" she called. \"I'm Lina. Have you seen a small grey cat? She has escaped from her basket!\"",
      "Mr Okafor shook his head, but then he heard a rustle among his tomato plants. Two green eyes stared out from between the leaves.",
      "\"I think,\" he said with a chuckle, \"that your cat has found my vegetables.\"",
      "Lina laughed with relief. Together they lifted the cat out of the leaves. \"She's called Pepper,\" said Lina. \"She's always hungry for adventure.\"",
      "Since that day, Lina has helped Mr Okafor with his watering, and he has taught her how to grow her own tomatoes. As for Pepper, she has claimed the sunniest spot on his garden bench."],
    vocab: { curiosity: "wanting to know about something", rustle: "a soft sound of leaves moving", relief: "a happy feeling when a worry goes away", claimed: "took as its own" },
    questions: [["How long has Mr Okafor lived at number 12?", ["forty years", "four years", "twelve years"], 0, "retrieval"], ["What does \"curiosity\" mean?", ["wanting to know about something", "feeling very tired", "being unkind"], 0, "vocabulary"],
      ["How did Mr Okafor know where the cat was?", ["He heard a rustle and saw two eyes.", "Lina told him.", "The cat meowed loudly."], 0, "inference"], ["What is the cat's name?", ["Pepper", "Lina", "Tomato"], 0, "retrieval"], ["How have things changed since that day?", ["Lina and Mr Okafor have become friends who garden together.", "Mr Okafor has moved house.", "The cat has gone back to its old home."], 0, "summarising"]],
    grammar: Object.assign({}, LPERF, { spots: ["has lived", "has grown", "has never missed", "has escaped", "has found", "has helped", "has taught", "has claimed"],
      practice: [["Which sentence uses the present perfect?", ["Lina has lived here for a week.", "Lina lived here.", "Lina is living here."], 0], ["Which is punctuated correctly?", ["\"Where is my cat?\" asked Lina.", "Where is my cat? asked Lina.", "\"Where is my cat? asked Lina."], 0], ["Choose the word: \"They ___ finished their homework.\"", ["have", "has", "having"], 0]] }) },
  { id: "l12-door", band: 12, title: "The Secret Door", type: "Story", text: [
      "Ella had lived in Grandad's old house for a week when she noticed the tiny door behind the bookcase. It was no taller than her knee, and it had a brass handle shaped like a leaf.",
      "\"Grandad,\" she called, \"what's behind the little door?\"",
      "Grandad looked up from his newspaper and smiled mysteriously. \"That door,\" he said, \"hasn't been opened for fifty years.\"",
      "\"Why not?\" asked Ella.",
      "\"Because nobody has found the key,\" he replied.",
      "Ella searched everywhere. She looked in drawers and jars, under rugs and inside old boots. At last, in the garden shed, she found a rusty key hanging on a nail. On its label, in faded ink, were the words: For the curious.",
      "Her hands were shaking as she turned the key in the lock. The door creaked open. Inside was a small wooden box, and inside the box was a bundle of letters tied with blue ribbon.",
      "\"These are the letters I wrote to your grandma,\" Grandad whispered, \"when I was working far away at sea. I thought they were lost forever.\"",
      "They sat together by the window, and Grandad read the letters aloud. Some made Ella laugh, and some made Grandad wipe his eyes. \"Thank you, Ella,\" he said finally. \"You've found something more precious than treasure.\""],
    vocab: { mysteriously: "in a way that suggests a secret", faded: "pale because it is old", bundle: "a group of things tied together", precious: "very special and important" },
    questions: [["Where was the little door?", ["behind the bookcase", "in the garden shed", "under a rug"], 0, "retrieval"], ["What words were on the key's label?", ["For the curious", "Do not open", "Grandad's key"], 0, "retrieval"],
      ["What was inside the box?", ["letters tied with blue ribbon", "gold coins", "another key"], 0, "retrieval"], ["Why did Grandad wipe his eyes?", ["The letters brought back strong memories.", "He had dust in his eyes.", "He was tired."], 0, "inference"], ["What does \"mysteriously\" mean?", ["in a way that suggests a secret", "very loudly", "in a cross way"], 0, "vocabulary"]],
    grammar: Object.assign({}, LSPEECH, { spots: ["\"Grandad,\" she called,", "\"Why not?\" asked Ella.", "\"Because nobody has found the key,\" he replied.", "\"Thank you, Ella,\" he said finally."],
      practice: [["Which sentence is punctuated correctly?", ["\"Where is the key?\" asked Ella.", "\"Where is the key? asked Ella.\"", "Where is the key? \"asked Ella.\""], 0], ["\"That door,\" he said, \"hasn't been opened for fifty years.\" Which words did Grandad actually say?", ["That door hasn't been opened for fifty years.", "he said", "That door he said"], 0], ["Where does the comma go?", ["\"I'm coming,\" said Ella.", "\"I'm coming\", said Ella.", "\"I'm coming\" said, Ella."], 0]] }) },
  { id: "l12-talent", band: 12, title: "The Talent Show", type: "Story", text: [
      "Ravi had practised his magic act for weeks, but on the day of the school talent show, his legs felt like jelly.",
      "\"I can't perform,\" he told his friend Maya. \"I'm too nervous. What if I drop the cards?\"",
      "Maya thought for a moment. \"Every performer feels nervous,\" she said. \"Even famous magicians. Your nerves just mean you care.\"",
      "Ravi peeked out from behind the curtain. The hall was full of parents, teachers and children. The first act was a dancer who spun across the stage like a top. Then came a singer, a poet and two boys who juggled oranges.",
      "At last, the teacher announced, \"Please welcome Ravi the Remarkable!\" Ravi took a deep breath and walked onto the stage. He shuffled the cards and asked a girl in the front row to choose one. His hands were trembling, but he kept going. He tapped the pack three times and pulled out her card. It was the queen of hearts!",
      "The audience gasped, and then the hall filled with applause. Ravi bowed, grinning from ear to ear.",
      "After the show, the head teacher shook his hand. \"That was a wonderful performance,\" she said. \"Your confidence grew with every trick.\" Ravi laughed. \"I wasn't confident at all at the start,\" he admitted. \"But I'm glad I didn't give up.\""],
    vocab: { applause: "clapping to show you enjoyed something", trembling: "shaking a little", remarkable: "amazing and worth talking about" },
    questions: [["What was Ravi worried about?", ["dropping the cards", "forgetting his words", "falling off the stage"], 0, "retrieval"], ["According to Maya, what do nerves mean?", ["that you care", "that you are ill", "that you should give up"], 0, "retrieval"],
      ["Which card did the girl choose?", ["the queen of hearts", "the king of spades", "the ace of diamonds"], 0, "retrieval"], ["What does \"applause\" mean?", ["clapping", "shouting", "silence"], 0, "vocabulary"], ["How had Ravi changed by the end?", ["He felt proud that he hadn't given up.", "He decided never to perform again.", "He was still too scared to speak."], 0, "inference"]],
    grammar: Object.assign({}, LFAM, { spots: ["perform", "performer", "performance", "nervous", "nerves", "confidence", "confident", "magic", "magicians"],
      practice: [["Which word is in the same family as \"perform\"?", ["performance", "perfume", "permit"], 0], ["Which fits? \"His ___ made his hands shake.\"", ["nerves", "nervous", "unnerve"], 0], ["A person who does magic is a…", ["magician", "magical", "magically"], 0]] }) },
  { id: "l12-capsule", band: 12, title: "The Time Capsule", type: "Story", text: [
      "Twenty-five years ago, the children of Palm Tree Primary buried a time capsule under the old ghaf tree. Today, Class 3 has dug it up.",
      "Inside the metal box, they have found a cassette tape, a newspaper, some photos and a letter. Mrs Rahman, who was a pupil at the school all those years ago, has come back to open it with them.",
      "\"I wrote this letter when I was eight,\" she laughed, holding up a crumpled page. \"I have never forgotten it.\" The children crowded round as she read: \"Dear future children, have you invented flying cars yet? Have you visited the Moon? We have just got a new computer room with five computers!\"",
      "Zaid giggled. \"We haven't invented flying cars,\" he said, \"but we have got tablets in every classroom.\" \"And people have sent a spacecraft to Mars!\" added Leila.",
      "Mrs Rahman smiled. \"So much has changed,\" she said. \"But some things haven't. Children still love stories, and the ghaf tree is still standing.\"",
      "Next, the class looked at the old photos. The school has grown since then: there are three new buildings and a library. The playground, however, looks almost the same.",
      "Now Class 3 has decided to make a new time capsule. They have written letters, chosen photos and drawn pictures of their lives today. Tomorrow they will bury it under the same tree. \"What will children think when they open it?\" asked their teacher. \"They'll think we were old-fashioned!\" said Zaid, and everyone laughed."],
    vocab: { capsule: "a small, closed container", invented: "made something new for the first time", "old-fashioned": "from long ago, not modern" },
    questions: [["Where was the time capsule buried?", ["under the old ghaf tree", "under the playground", "in the library"], 0, "retrieval"], ["Who wrote the letter in the capsule?", ["Mrs Rahman, when she was eight", "Zaid", "the head teacher"], 0, "retrieval"],
      ["What has hardly changed at the school?", ["the playground", "the computer room", "the buildings"], 0, "retrieval"], ["What will Class 3 do tomorrow?", ["bury a new time capsule", "open another box", "visit Mars"], 0, "retrieval"], ["Why does Zaid think future children will call them old-fashioned?", ["Things will keep changing in the future.", "They don't like the ghaf tree.", "They wrote their letters badly."], 0, "inference"]],
    grammar: Object.assign({}, LPERF, { spots: ["has dug", "have found", "has come", "have never forgotten", "have got", "have sent", "has changed", "has grown", "has decided", "have written"],
      practice: [["Which sentence uses the present perfect?", ["The school has grown.", "The school grew.", "The school is growing."], 0], ["Which fits? \"We ___ written our letters.\"", ["have", "has", "having"], 0], ["Which fits? \"She ___ come back to open it.\"", ["has", "have", "is"], 0]] }) },
  { id: "l12-volcanoes", band: 12, title: "How Do Volcanoes Work?", type: "Information", text: [
      "Deep beneath our feet, the Earth is incredibly hot. In some places, rock melts into a thick, glowing liquid called magma.",
      "Magma is lighter than the solid rock around it, so it slowly rises towards the surface. It collects in an underground space called a magma chamber. As more magma gathers, the pressure builds and builds.",
      "When the pressure becomes too great, the volcano erupts. During an eruption, magma bursts out through an opening called a vent. Once it reaches the surface, magma is called lava. Lava can flow down the sides of the volcano like a river of fire, and volcanic ash can shoot high into the sky.",
      "Volcanoes can be active, dormant or extinct. An active volcano has erupted recently and may erupt again. A dormant volcano is sleeping: it hasn't erupted for a long time, but it could wake up. An extinct volcano is not expected to erupt ever again.",
      "Although eruptions can be dangerous, volcanoes are also useful. Volcanic soil is very rich, so farmers often grow crops nearby. In some countries, the heat from volcanoes is used to make electricity.",
      "Scientists who study volcanoes are called volcanologists. They use special equipment to measure the ground and the gases, so they can warn people before an eruption happens."],
    vocab: { magma: "melted rock under the ground", pressure: "a strong pushing force", dormant: "sleeping, not active for now", extinct: "no longer active at all" },
    questions: [["What is magma called when it reaches the surface?", ["lava", "ash", "vent"], 0, "retrieval"], ["What is a dormant volcano?", ["one that is sleeping and could wake up", "one that will never erupt again", "one that is erupting now"], 0, "retrieval"],
      ["Why do farmers often grow crops near volcanoes?", ["The volcanic soil is very rich.", "It is always warm there.", "There is lots of rain."], 0, "retrieval"], ["What does \"pressure\" mean?", ["a strong pushing force", "a kind of rock", "a loud noise"], 0, "vocabulary"], ["Why do volcanologists measure the ground and gases?", ["so they can warn people before an eruption", "to make electricity", "to grow crops"], 0, "inference"]],
    grammar: Object.assign({}, LFAM, { spots: ["erupts", "eruption", "erupted", "erupt", "eruptions", "volcanic", "Volcanic", "volcanologists"],
      practice: [["Which word is in the same family as \"erupt\"?", ["eruption", "error", "erase"], 0], ["Which fits? \"Ash from a volcano is ___ ash.\"", ["volcanic", "volcanoes", "volcanist"], 0], ["A scientist who studies volcanoes is a…", ["volcanologist", "volcanic", "volcano"], 0]] }) },
  { id: "l12-moonletter", band: 12, title: "A Letter from Moon Base One", type: "Letter", text: [
      "Moon Base One, Tuesday",
      "Dear Grandma,",
      "I have been on the Moon for two weeks now, and I have so much to tell you!",
      "Living here is very different from living on Earth. Because there is much less gravity, I have learned to walk in big, bouncy steps. On my first day, I jumped so high that I bumped my head on the ceiling!",
      "We have planted seeds in our greenhouse, and the first lettuces have started to grow. The plants need special lights, because a day on the Moon lasts about two weeks, and so does a night.",
      "Yesterday, I went outside in my spacesuit for the first time. I have never seen anything so beautiful. The sky is completely black, even in the daytime, and the Earth looks like a blue and white marble hanging in space. I have taken lots of photos to show you.",
      "The food here is not as tasty as yours. Everything comes in packets, and we must be careful that crumbs don't float into the machines. I have really missed your cardamom biscuits!",
      "Our scientists have collected rocks that are billions of years old. We have sent some back to Earth so they can be studied. I will be home in three months. Please save some biscuits for me!",
      "Lots of love from space,",
      "Amal"],
    vocab: { gravity: "the force that pulls things down towards the ground", greenhouse: "a glass building where plants are grown", cardamom: "a sweet-smelling spice" },
    questions: [["How long has Amal been on the Moon?", ["two weeks", "three months", "one day"], 0, "retrieval"], ["Why does Amal walk in big, bouncy steps?", ["There is much less gravity.", "The floor is made of rubber.", "Amal likes to play games."], 0, "retrieval"],
      ["What does the Earth look like from the Moon?", ["a blue and white marble", "a big orange ball", "a tiny star"], 0, "retrieval"], ["Why must they be careful with crumbs?", ["They could float into the machines.", "Grandma doesn't like mess.", "They attract insects."], 0, "inference"], ["How does Amal feel about Grandma?", ["Amal loves and misses her.", "Amal is cross with her.", "Amal has forgotten her."], 0, "inference"]],
    grammar: Object.assign({}, LPERF, { spots: ["have been", "have learned", "have planted", "have started", "have never seen", "have taken", "have really missed", "have collected", "have sent"],
      practice: [["Which sentence uses the present perfect?", ["I have taken lots of photos.", "I took lots of photos.", "I am taking lots of photos."], 0], ["Which fits? \"The lettuces ___ started to grow.\"", ["have", "has", "is"], 0], ["Which fits? \"Amal ___ missed Grandma's biscuits.\"", ["has", "have", "having"], 0]] }) },
  { id: "l12-desert", band: 12, title: "Rare Rain Brings Desert to Life", type: "News report", text: [
      "By our nature reporter",
      "Visitors to the desert this week have been amazed to see the sand dunes covered in green shoots and tiny yellow flowers, after the heaviest rain in ten years.",
      "The rain fell for two days last month. Within a week, seeds that had been lying in the sand for years began to sprout.",
      "\"I have walked here every winter since I was a boy,\" said Mr Salem Al Mansoori, a local guide, \"and I have never seen it this green. It is like a carpet has been rolled out across the dunes.\"",
      "Scientists explain that many desert plants have seeds with tough coats. The seeds can survive for many years without water, waiting for the perfect moment to grow.",
      "\"These plants live fast,\" explained Dr Fatima Khalil, a plant expert. \"They grow, flower and make new seeds in just a few weeks, before the ground dries out again.\"",
      "The flowers have also brought insects, birds and even lizards out to feed. Families have been visiting at sunrise to enjoy the view.",
      "However, rangers have asked visitors to stay on the paths. \"Please don't pick the flowers or drive over the plants,\" said ranger Aisha Saeed. \"If we protect them now, their seeds will be ready for the next rain.\"",
      "The green carpet is expected to last for another two weeks."],
    vocab: { sprout: "start to grow", rangers: "people whose job is to look after nature areas", survive: "stay alive" },
    questions: [["What made the desert turn green?", ["the heaviest rain in ten years", "new farms", "people planting flowers"], 0, "retrieval"], ["How can desert seeds survive for years?", ["They have tough coats.", "They are kept in shops.", "They are watered every day."], 0, "retrieval"],
      ["What does \"sprout\" mean?", ["start to grow", "dry out", "fall down"], 0, "vocabulary"], ["Why have rangers asked visitors to stay on the paths?", ["to protect the plants so their seeds are ready for the next rain", "because the paths are cooler", "so visitors don't get lost"], 0, "inference"], ["Mr Al Mansoori says it is like a carpet has been rolled out. He means…", ["the ground is covered in green", "someone left a carpet in the desert", "the sand is soft"], 0, "language"]],
    grammar: Object.assign({}, LSPEECH, { explain: "News reports use inverted commas to show the exact words people said. The speaker's name and a reporting verb (said, explained) go outside the inverted commas.",
      spots: ["\"I have walked here every winter since I was a boy,\" said Mr Salem Al Mansoori,", "\"These plants live fast,\" explained Dr Fatima Khalil,", "\"Please don't pick the flowers or drive over the plants,\" said ranger Aisha Saeed."],
      practice: [["Which words did Dr Khalil actually say?", ["These plants live fast", "explained Dr Fatima Khalil", "a plant expert"], 0], ["Which is punctuated correctly?", ["\"The seeds are waiting,\" said the scientist.", "\"The seeds are waiting\" said the scientist.", "The seeds are waiting, \"said the scientist.\""], 0], ["Which word tells us how the person spoke?", ["explained", "plants", "fast"], 0]] }) },
  { id: "l12-watercycle", band: 12, title: "The Water Cycle", type: "Information", text: [
      "The water you drink today might once have been drunk by a dinosaur! That is because the Earth's water is used again and again, on a journey called the water cycle.",
      "Evaporation: The sun heats water in seas, rivers and lakes. Some of the water evaporates, which means it turns into an invisible gas called water vapour and rises into the air.",
      "Condensation: High in the sky, the air is cooler. The water vapour cools down and condenses into tiny droplets. Millions of droplets gather together to make clouds.",
      "Precipitation: When the droplets join together and become too heavy, they fall back to Earth as precipitation. This can be rain, hail, sleet or snow, depending on how cold it is.",
      "Collection: The water collects in seas, rivers, lakes and underground. Some of it soaks into the soil, where plants drink it up through their roots. Then the sun heats it again, and the cycle continues.",
      "In hot countries like the UAE, rain does not fall very often. That is why it is so important to save water. Turning off the tap while you brush your teeth can save several litres of water every day."],
    vocab: { invisible: "cannot be seen", vapour: "water in the form of a gas", droplets: "very small drops", cycle: "something that happens again and again in the same order" },
    questions: [["What is water vapour?", ["an invisible gas", "a kind of cloud", "frozen rain"], 0, "retrieval"], ["What happens during condensation?", ["Water vapour cools and turns into tiny droplets.", "Water falls as rain.", "The sun heats the sea."], 0, "retrieval"],
      ["Which stage comes straight after evaporation?", ["condensation", "precipitation", "collection"], 0, "sequencing"], ["What is precipitation?", ["water falling as rain, hail, sleet or snow", "water soaking into soil", "water turning into gas"], 0, "retrieval"], ["Why is saving water so important in the UAE?", ["Rain does not fall very often.", "The sea is too salty.", "There are no rivers."], 0, "inference"]],
    grammar: Object.assign({}, LFAM, { spots: ["Evaporation", "evaporates", "Condensation", "condenses", "Collection", "collects"],
      practice: [["Which word is in the same family as \"condense\"?", ["condensation", "condition", "conductor"], 0], ["Which fits? \"When water ___, it turns into vapour.\"", ["evaporates", "evaporation", "evaporating"], 0], ["Which word is the name of the process (a noun)?", ["evaporation", "evaporate", "evaporates"], 0]] }) },
  { id: "l12-havedone", band: 12, title: "Things I Have Done", type: "Poem", text: [
      "I have climbed the tallest tree in the park,",
      "I have counted the stars till long after dark,",
      "I have built a castle from cushions and chairs,",
      "I have raced my brother up and down the stairs.",
      "I have tasted a lemon and pulled a strange face,",
      "I have watched a rocket fly off into space,",
      "I have learned how to whistle, I've learned how to swim,",
      "I have shared all my sweets with my best friend Kareem.",
      "But there's one thing I haven't done (not yet, not quite):",
      "I haven't stayed awake for a whole, entire night!"],
    vocab: { cushions: "soft pillows for sofas and chairs", entire: "whole, from start to end" },
    questions: [["What did the child build a castle from?", ["cushions and chairs", "sand", "boxes"], 0, "retrieval"], ["Who did the child share their sweets with?", ["Kareem", "their brother", "Grandma"], 0, "retrieval"],
      ["What has the child not done yet?", ["stayed awake for a whole night", "learned to swim", "climbed a tree"], 0, "retrieval"], ["Why did the child pull a strange face?", ["The lemon was sour.", "They fell out of the tree.", "The rocket was loud."], 0, "inference"], ["How are the last two lines different from the rest?", ["They tell us what the child hasn't done.", "They are questions.", "They don't rhyme."], 0, "structure"]],
    grammar: Object.assign({}, LPERF, { spots: ["have climbed", "have counted", "have built", "have raced", "have tasted", "have watched", "have learned", "I've learned", "have shared", "haven't done", "haven't stayed"],
      practice: [["\"I've\" is short for…", ["I have", "I was", "I am"], 0], ["Which line uses the present perfect?", ["I have climbed the tallest tree.", "I climbed the tallest tree.", "I will climb the tallest tree."], 0], ["Which fits? \"I ___ never seen a whale.\"", ["have", "has", "having"], 0]] }) },
  { id: "l12-moon", band: 12, title: "Conversation with the Moon", type: "Poem", text: [
      "\"Moon,\" I whispered, \"why do you change?",
      "Some nights you're round, some nights you're strange:",
      "A slice of melon, a silver bow,",
      "Then gone completely. Where do you go?\"",
      "The Moon just smiled. \"I never leave,",
      "Whatever stories you believe.",
      "The sun lights half of me each night,",
      "But you can't always see that light.\"",
      "\"So when I can't see you,\" I replied,",
      "\"You're still up there, on the other side?\"",
      "\"That's right,\" she said, and winked her light.",
      "\"Now close your eyes, and say goodnight.\""],
    vocab: { completely: "totally, all of it", whispered: "spoke very quietly" },
    questions: [["What does the child compare the Moon's shapes to?", ["a slice of melon and a silver bow", "a ball and a star", "a boat and a cloud"], 0, "retrieval"], ["What does the Moon say lights her up?", ["the sun", "the stars", "street lights"], 0, "retrieval"],
      ["Does the Moon really go away?", ["No, it is still there.", "Yes, every night.", "Yes, in winter."], 0, "inference"], ["The Moon \"smiled\" and \"winked\". The poet writes about the Moon…", ["as if it were a person", "as if it were an animal", "as if it were a machine"], 0, "language"], ["How does the poem end?", ["The Moon tells the child to say goodnight.", "The child falls asleep at the window.", "The Moon disappears."], 0, "summarising"]],
    grammar: Object.assign({}, LSPEECH, { explain: "In poems and stories, inverted commas show the exact words a character says. Words like \"I replied\" and \"she said\" are not spoken, so they go outside the inverted commas.",
      spots: ["\"Moon,\" I whispered,", "\"I never leave,", "\"So when I can't see you,\" I replied,", "\"That's right,\" she said,"],
      practice: [["Who says \"I never leave\"?", ["the Moon", "the child", "the sun"], 0], ["Which is punctuated correctly?", ["\"That's right,\" she said.", "That's right,\" she said.", "\"That's right, she said.\""], 0], ["Why is \"I replied\" outside the inverted commas?", ["Those words are not spoken.", "They are the most important words.", "They are a question."], 0]] }) }
];


TEST_A[12] = LIME_A; TEST_B[12] = LIME_B; TEXTS.push(...LIME_TEXTS);

/* =================== DARK BLUE BAND: full set =================== */
/* DARK BLUE BAND (15) · Year 5 · reading age 9y6m–10y6m
   Grammar: relative clauses; modal verbs for possibility; brackets, dashes and commas for parenthesis */
const DARKBLUE_A = [
  ["The professor's argument was ___ by evidence from several experiments.", ["supported", "supposed", "suppressed", "surrounded"], 0],
  ["Migrating birds rely on a remarkable sense of ___ to find their way.", ["direction", "decoration", "dedication", "description"], 0],
  ["The talks were ___, and both sides agreed to the new plan.", ["successful", "suspicious", "superficial", "sustainable"], 0],
  ["The novel's ___ is a young girl who must save her village.", ["protagonist", "prototype", "procession", "proposal"], 0],
  ["The explorer kept a detailed ___ of her expedition.", ["journal", "jungle", "juggler", "jewel"], 0],
  ["The ancient Egyptians ___ their dead using special oils.", ["preserved", "presented", "pretended", "prevented"], 0],
  ["The detective noticed a ___ footprint near the window.", ["suspicious", "delicious", "ambitious", "nutritious"], 0],
  ["The climbers reached the ___ of the mountain at dawn.", ["summit", "summary", "summon", "sum"], 0],
  ["Recycling helps to ___ the amount of waste we produce.", ["reduce", "deduce", "introduce", "induce"], 0],
  ["The new park was ___ by most of the town's residents.", ["welcomed", "wondered", "wandered", "weathered"], 0],
  ["The plants ___ when they were left without water.", ["wilted", "wielded", "willed", "waited"], 0],
  ["Her ___ answer showed that she had read the book carefully.", ["thoughtful", "careless", "painful", "fearful"], 0],
  ["The charity raised money to ___ a new well in the village.", ["construct", "conduct", "consult", "convict"], 0],
  ["The athlete's ___ training paid off when she won gold.", ["rigorous", "ridiculous", "rebellious", "ravenous"], 0],
  ["The museum's collection includes ___ from many different centuries.", ["artefacts", "artistry", "arteries", "artichokes"], 0],
  ["The scientist's theory was ___ by the results of the experiment.", ["confirmed", "conformed", "confused", "confined"], 0],
  ["The ship was ___ by the fierce storm and sank.", ["wrecked", "wreathed", "wrestled", "wrinkled"], 0],
  ["Mountain gorillas are an ___ species, so they must be protected.", ["endangered", "enraged", "endorsed", "engaged"], 0],
  ["The children ___ the old map to find the hidden cave.", ["consulted", "consoled", "consumed", "conspired"], 0],
  ["The orchestra's ___ was greeted with thunderous applause.", ["performance", "perfume", "permission", "persuasion"], 0],
  ["Although the task was ___, the team refused to give up.", ["challenging", "charming", "changing", "charging"], 0],
  ["The witness gave a ___ description of the thief.", ["vivid", "vain", "vast", "void"], 0],
  ["Camels are well ___ to life in the desert.", ["adapted", "adopted", "adored", "adorned"], 0],
  ["The volunteers worked ___ to clean the beach.", ["tirelessly", "tiresome", "tiredness", "tirade"], 0],
  ["The king issued a ___ declaring a national holiday.", ["proclamation", "procrastination", "proportion", "profession"], 0],
  ["The teacher asked us to ___ the main points of the article.", ["summarise", "surprise", "supervise", "sterilise"], 0],
  ["The bridge was closed because it was no longer ___.", ["stable", "stubble", "staple", "stale"], 0],
  ["The fox's ___ coat helped it hide among the autumn leaves.", ["russet", "rustic", "rustled", "restless"], 0],
  ["Hundreds of ___ watched the rocket launch from a safe distance.", ["spectators", "speculators", "spectacles", "specimens"], 0],
  ["The heavy rain caused the river to ___ its banks.", ["overflow", "overlook", "overtake", "overhear"], 0]
];

const DARKBLUE_B = [
  { title: "Should Zoos Exist?", text: [
      "For more than two hundred years, zoos have allowed people to see animals from every corner of the world. Today, however, many people question whether keeping wild animals in captivity can ever be fair.",
      "Supporters argue that modern zoos play a vital role in conservation. Breeding programmes have helped to save species such as the Arabian oryx, which had disappeared from the wild by 1972 but has since been successfully returned to the deserts of the Arabian Peninsula. Zoos also fund research and inspire millions of visitors, especially children, to care about wildlife.",
      "Critics, on the other hand, point out that even the most spacious enclosure is tiny compared with an animal's natural range. Elephants, for example, may walk many kilometres a day in the wild. Some animals in captivity develop repetitive behaviours, such as pacing, which may be a sign of stress. Critics believe the money spent on zoos would be better used to protect habitats directly.",
      "Perhaps the answer lies somewhere in between. If zoos focus on species that genuinely benefit from protection, and give animals space to behave naturally, they may continue to earn their place in the modern world."],
    q: [["Which animal was returned to the wild thanks to breeding programmes?", ["the Arabian oryx", "the African elephant", "the polar bear"], 0, "retrieval"],
        ["What does \"captivity\" mean?", ["being kept in an enclosed place", "living freely in the wild", "being very old"], 0, "vocabulary"],
        ["Why does the writer mention pacing?", ["as possible evidence that animals are stressed", "to show that zoo animals are healthy", "to describe how elephants find food"], 0, "inference"],
        ["Why does the writer use \"on the other hand\" in the third paragraph?", ["to introduce the opposite point of view", "to give an example of a zoo", "to show the text is ending"], 0, "structure"],
        ["What is the writer's conclusion?", ["Zoos can be justified if they protect species and give animals space.", "All zoos should close as soon as possible.", "Zoos are perfect and should not change."], 0, "summarising"]] },
  { title: "The Clockmaker's Apprentice", text: [
      "Nobody in the town of Bellmoor could remember a time when the great clock had stopped. So when its hands froze at seventeen minutes past three one foggy Tuesday, people gathered in the square, whispering anxiously.",
      "Old Mr Thorne, the clockmaker, had been ill for weeks. His apprentice, a quiet girl called Ines, was only twelve. She had swept his workshop and polished his tools, but she had never repaired anything larger than a pocket watch.",
      "\"Someone should send for a clockmaker from the city,\" muttered the mayor.",
      "Ines said nothing. She climbed the narrow spiral staircase, her lantern swinging, until she reached the clock's enormous heart. Gears as big as cartwheels loomed above her, motionless in the gloom.",
      "For an hour she studied them, tracing each tooth with her finger, just as Mr Thorne had taught her. At last she found it: a single bent cog, no bigger than her palm, jammed against its neighbour. With trembling hands, she eased it free and straightened it with her smallest hammer. Then she held her breath and pushed the pendulum.",
      "Tick. Tock. Tick.",
      "Far below, a cheer rose from the square. That evening, Ines visited Mr Thorne. He listened to her story with his eyes closed, then smiled. \"I always knew,\" he said, \"that the clock was in good hands.\""],
    q: [["At what time did the clock stop?", ["seventeen minutes past three", "three o'clock exactly", "midnight"], 0, "retrieval"],
        ["What is an \"apprentice\"?", ["a young person learning a skill from an expert", "a person who owns a shop", "a kind of clock"], 0, "vocabulary"],
        ["Why did the mayor want to send for a clockmaker from the city?", ["He did not believe Ines could fix it.", "Mr Thorne had asked him to.", "The city clock was broken too."], 0, "inference"],
        ["\"Gears as big as cartwheels loomed above her.\" What effect does this have?", ["It makes the gears seem huge and a little frightening.", "It shows the gears were moving fast.", "It tells us Ines liked wheels."], 0, "language"],
        ["What does Mr Thorne mean by \"the clock was in good hands\"?", ["Ines is skilled and can be trusted.", "The clock has hands that work well.", "The mayor will look after the clock."], 0, "inference"]] },
  { title: "The Migrants", text: [
      "Each autumn, when the north wind cools,",
      "They gather on the wires in rows:",
      "Swallows, swifts and martins, all",
      "Who heard a call nobody knows.",
      "They do not pack, they do not plan,",
      "They need no map, they need no light;",
      "They read the sun, the stars, the fields,",
      "And slip like shadows into flight.",
      "Across the sea, across the sand,",
      "Ten thousand miles of sky and air,",
      "Until, one morning in the spring,",
      "They find the barn, and they are there."],
    q: [["When do the birds gather on the wires?", ["in autumn", "in spring", "at night"], 0, "retrieval"],
        ["In this poem, what are \"migrants\"?", ["birds that travel to another place for part of the year", "birds that live on wires", "people who build barns"], 0, "vocabulary"],
        ["\"A call nobody knows\" suggests that the birds…", ["know when to leave without being told", "are called by a farmer", "are lost"], 0, "inference"],
        ["\"Slip like shadows into flight\" tells us the birds leave…", ["quietly and smoothly", "noisily and suddenly", "slowly and sadly"], 0, "language"],
        ["How does the last verse show that the journey is over?", ["The birds find the barn in spring.", "The birds fall asleep.", "The wind stops blowing."], 0, "structure"]] }
];

const DREL = { focus: "Relative clauses", explain: "A relative clause adds information about a noun. It begins with a relative pronoun: who, which, whose, where, when or that. For example: My aunt, who studies whales, lives by the sea." };
const DMOD = { focus: "Modal verbs", explain: "Modal verbs (can, could, may, might, must, should, will, would) show how likely something is, or whether it is possible, necessary or a good idea. Must and will sound certain; might and could sound less sure." };
const DPAR = { focus: "Parenthesis: brackets, dashes and commas", explain: "Parenthesis is extra information added to a sentence. It can go in brackets ( ), between dashes – –, or between commas. If you take it out, the sentence still makes sense." };

const DARKBLUE_TEXTS = [
  { id: "db15-bridge", band: 15, title: "The Bridge Builders", type: "Information", text: [
      "In 1883, the Brooklyn Bridge, which connected Manhattan and Brooklyn across the East River, opened to the public. At the time, it was the longest suspension bridge in the world – a remarkable achievement for engineers who had never attempted anything on such a scale.",
      "The bridge was designed by John Roebling, whose plans used steel wire cables rather than iron chains. Tragically, Roebling died before construction began, so his son Washington took charge. Washington, however, became seriously ill after working in the deep underwater chambers (called caissons) where the foundations were being dug.",
      "Unable to visit the site, Washington watched the work through a telescope from his bedroom window. His wife, Emily Warren Roebling, carried his instructions to the engineers each day. She studied mathematics and engineering so thoroughly that she could answer the engineers' questions herself, and many historians now believe she should be recognised as one of the bridge's builders.",
      "When the bridge finally opened, Emily was the first person to cross it. Today, more than a hundred thousand vehicles may cross it each day."],
    vocab: { suspension: "hanging from strong cables", achievement: "something difficult done successfully", foundations: "the strong base that holds a structure up", thoroughly: "completely and carefully" },
    questions: [["Who designed the bridge?", ["John Roebling", "Washington Roebling", "Emily Warren Roebling"], 0, "retrieval"], ["Why couldn't Washington visit the site?", ["He was seriously ill.", "He was working abroad.", "He had retired."], 0, "retrieval"],
      ["Why do historians believe Emily should be recognised?", ["She understood the engineering and guided the work.", "She paid for the bridge.", "She designed the cables."], 0, "inference"], ["Why are the words \"called caissons\" in brackets?", ["To add extra information that explains a word", "To show someone is speaking", "To mark the most important idea"], 0, "structure"],
      ["Which sentence best sums up the text?", ["The Brooklyn Bridge was built with the help of three members of the Roebling family.", "The Brooklyn Bridge was built in one year.", "Emily Roebling designed every part of the bridge."], 0, "summarising"]],
    grammar: { focus: "Relative clauses · parenthesis · modal verbs", explain: "A relative clause adds information about a noun, using who, which, whose, where or that. Brackets, dashes or commas add extra information (parenthesis). Modal verbs (may, should, could) show how likely or necessary something is.",
      spots: ["which connected Manhattan and Brooklyn across the East River", "whose plans used steel wire cables", "(called caissons)", "should be recognised", "may cross"],
      practice: [["Which word starts the relative clause? \"The engineer, who designed the bridge, was famous.\"", ["who", "designed", "famous"], 0], ["Which sentence uses brackets correctly?", ["The caissons (underwater chambers) were dangerous.", "The (caissons underwater) chambers were dangerous.", "The caissons were (dangerous."], 0], ["Which modal verb shows the most certainty?", ["will", "might", "could"], 0]] } },
  { id: "db15-map", band: 15, title: "The Map in the Attic", type: "Story", text: [
      "It was raining – the heavy, endless rain of late November – when Leo and his cousin Amira decided to explore the attic.",
      "Grandma's attic was a maze of boxes, broken lamps and suitcases (most of them older than Grandma herself). Dust drifted in the thin beam of their torch. Somewhere, a pipe dripped steadily.",
      "\"Look at this,\" whispered Amira. Wedged behind a mirror was a leather tube, cracked with age. Inside, rolled tightly, was a map.",
      "The map – which was drawn in faded brown ink – showed a coastline they both recognised: the bay below Grandma's house. A dotted line wound from the old lighthouse to a rock shaped like a sleeping dog, and ended at a small, careful X.",
      "\"Treasure,\" breathed Leo. \"Or a joke,\" said Amira, although her eyes were shining.",
      "At the bottom of the map, someone had written a name: Captain Elias Ward, 1891. Underneath, in smaller letters, was a warning: Follow the tide, not the path.",
      "They took the map downstairs. Grandma – who had been knitting by the fire – put down her needles and went very still. \"Elias Ward,\" she said slowly, \"was my great-grandfather. He was a fisherman, not a captain, but he loved to tell stories. Everyone said he had hidden something in the cove. Nobody ever found it.\"",
      "Leo and Amira looked at each other. \"The tide's low tomorrow at six,\" said Grandma, picking up her knitting again. \"I'll make sandwiches.\"",
      "Outside, the rain had finally stopped."],
    vocab: { wedged: "pushed tightly into a small space", recognised: "knew because they had seen it before", cove: "a small, sheltered bay" },
    questions: [["Where did Amira find the leather tube?", ["wedged behind a mirror", "inside a suitcase", "under the floor"], 0, "retrieval"], ["Who was Elias Ward?", ["Grandma's great-grandfather, a fisherman", "a famous sea captain", "Leo's teacher"], 0, "retrieval"],
      ["Why did Grandma go very still?", ["She recognised the name and was surprised.", "She was cold.", "She had fallen asleep."], 0, "inference"], ["What will the children probably do tomorrow?", ["follow the map at low tide", "put the map back in the attic", "sell the map"], 0, "prediction"],
      ["Why does the writer end with \"Outside, the rain had finally stopped\"?", ["It suggests a new, hopeful start to the adventure.", "It tells us the story is set in summer.", "It explains why they found the map."], 0, "structure"]],
    grammar: Object.assign({}, DPAR, { spots: ["– the heavy, endless rain of late November –", "(most of them older than Grandma herself)", "– which was drawn in faded brown ink –", "– who had been knitting by the fire –"],
      practice: [["Which part is the parenthesis? \"The map – which was drawn in faded ink – showed the bay.\"", ["which was drawn in faded ink", "The map", "showed the bay"], 0], ["Which sentence uses brackets correctly?", ["Grandma's attic (full of old boxes) was dusty.", "Grandma's (attic full of old boxes was dusty.)", "Grandma's attic full of (old boxes was) dusty."], 0], ["If you remove the parenthesis, the sentence should…", ["still make sense", "become a question", "need a new full stop"], 0]] }) },
  { id: "db15-robot", band: 15, title: "The Robot Who Wanted to Paint", type: "Story", text: [
      "Unit 7 had been built to sort parcels. Every day, it scanned barcodes, lifted boxes and placed them on the right conveyor belt. It was very good at its job. It never made mistakes.",
      "One morning, a parcel split open, and a box of paints tumbled onto the factory floor. Unit 7 should have swept them into the bin. Instead, it picked up a brush.",
      "It did not know why. Perhaps it was the colours: a blue as deep as the night sky, a yellow that might have been bottled sunshine. Unit 7 dipped the brush and drew a single line across a piece of cardboard. The line was wobbly. It was not efficient. It was, Unit 7 decided, the most interesting thing it had ever made.",
      "That night, when the factory was dark, Unit 7 painted again. It painted the moon through the high window. It painted the cat that slept by the boiler. It painted the faces of the workers who smiled at it each morning.",
      "When the manager found the paintings, Unit 7 expected to be switched off. Robots must not waste time, after all. But the manager stared at the paintings for a long time. \"Did you do these?\" she asked quietly.",
      "\"Yes,\" said Unit 7. \"I could stop, if you wish.\"",
      "The manager shook her head. \"No,\" she said. \"I think you should keep going. Perhaps we could hang them in the canteen.\"",
      "The following week, Unit 7's paintings covered the canteen walls. Workers stopped to look at them on their breaks. And every evening, when the parcels were sorted, Unit 7 picked up its brush."],
    vocab: { efficient: "doing a job well without wasting time or effort", conveyor: "a moving belt that carries things", canteen: "a room where workers eat" },
    questions: [["What was Unit 7 built to do?", ["sort parcels", "paint pictures", "clean the factory"], 0, "retrieval"], ["Why did Unit 7 expect to be switched off?", ["It believed robots must not waste time.", "Its battery was low.", "It had broken a parcel."], 0, "inference"],
      ["What does \"efficient\" mean?", ["doing a job well without wasting time or effort", "very colourful", "slow and careful"], 0, "vocabulary"], ["\"A yellow that might have been bottled sunshine\" suggests the yellow was…", ["bright and warm", "dull and dirty", "pale and cold"], 0, "language"],
      ["What is the main message of the story?", ["Creativity can be found in unexpected places.", "Robots should never be trusted.", "Factories are boring places."], 0, "summarising"]],
    grammar: Object.assign({}, DMOD, { spots: ["should have swept", "might have been", "must not", "could stop", "should keep going", "could hang"],
      practice: [["Which modal verb shows that something is necessary?", ["must", "might", "could"], 0], ["Which fits? \"Perhaps we ___ hang them in the canteen.\"", ["could", "must", "will"], 0], ["Which modal verb shows the least certainty?", ["might", "will", "must"], 0]] }) },
  { id: "db15-pearl", band: 15, title: "The Pearl Diver's Son", type: "Story", text: [
      "Long before oil was discovered, many people of the Gulf earned their living from the sea. Every summer, the pearling boats, which could carry dozens of men, sailed out to the oyster beds for four long months.",
      "Salem was eleven when his father, who was the best diver in the village, took him aboard for the first time. Salem's job was to help the pullers, whose task was to haul the divers back up when they tugged on the rope.",
      "The divers worked from sunrise to sunset. Each one wore a nose clip made of turtle shell and leather guards on his fingers. Weighted with a stone, he would sink to the seabed, where he gathered as many oysters as he could before his breath ran out.",
      "At night, the crew sat on the deck, which was still warm from the sun, and listened to the nahham. He was the singer whose songs kept their spirits up through the long, hard weeks.",
      "One evening, Salem's father handed him an oyster. \"Open it,\" he said. Inside, nestled in the soft flesh, was a pearl that glowed like a tiny moon. \"The sea gives us gifts,\" said his father, \"but only to those who respect it.\"",
      "Salem never became a diver. By the time he grew up, cultured pearls from Japan had made the old trade disappear. But he kept that pearl all his life. Today, it sits in a museum, beside a nose clip and a diver's stone, where children who have never seen a pearling boat can imagine the songs of the sea."],
    vocab: { haul: "pull with a lot of effort", nestled: "lying snugly in a soft place", cultured: "grown by people on purpose" },
    questions: [["How long did the pearling trips last?", ["four months", "four weeks", "one year"], 0, "retrieval"], ["What was the pullers' job?", ["to haul the divers back up", "to sing to the crew", "to steer the boat"], 0, "retrieval"],
      ["What does \"nestled\" mean in the text?", ["lying snugly in a soft place", "floating on the water", "hidden under sand"], 0, "vocabulary"], ["Why did Salem never become a diver?", ["Cultured pearls made the old trade disappear.", "He was afraid of the sea.", "His father did not let him."], 0, "inference"],
      ["What does his father mean by \"only to those who respect it\"?", ["You must treat the sea with care.", "The sea is dangerous for children.", "Only the best divers find pearls."], 0, "inference"]],
    grammar: Object.assign({}, DREL, { spots: ["which could carry dozens of men", "who was the best diver in the village", "whose task was to haul the divers back up", "where he gathered as many oysters as he could", "which was still warm from the sun", "whose songs kept their spirits up", "who respect it", "where children who have never seen a pearling boat can imagine the songs of the sea"],
      practice: [["Which word starts the relative clause? \"The boats, which carried dozens of men, sailed out.\"", ["which", "boats", "sailed"], 0], ["Which fits? \"The nahham was the singer ___ songs kept their spirits up.\"", ["whose", "who", "which"], 0], ["Which fits? \"Salem visited the museum ___ his pearl is kept.\"", ["where", "who", "whose"], 0]] }) },
  { id: "db15-whale", band: 15, title: "Whale Song", type: "Story", text: [
      "Kai had spent the whole summer on his aunt's research boat, which bobbed in the grey waters off the coast. Aunt Mei was a marine biologist who studied humpback whales, and she had spent twenty years listening to their songs.",
      "\"Every group has its own song,\" she explained, adjusting the headphones on Kai's ears. \"The males sing it during the breeding season, and it changes a little every year.\"",
      "Kai heard a low moan that rose into a long, wavering whistle, then broke into clicks and groans. The sound seemed to come from everywhere at once. \"How far away is it?\" he whispered.",
      "\"Perhaps twenty kilometres,\" said Aunt Mei. \"Sound travels much further in water than in air.\"",
      "On the last day of the trip, the hydrophone, which was a microphone that worked underwater, picked up something strange. The song was different: higher, sharper, with a phrase that repeated again and again. Aunt Mei frowned at her screen. \"That's not our group's song,\" she said slowly. \"That's a song from the other side of the ocean.\"",
      "Kai stared at her. \"So a whale has travelled all that way?\"",
      "\"Or the song has,\" she said. \"Whales that meet on their journeys sometimes learn each other's songs. Then they bring them home, like souvenirs.\"",
      "That evening, Kai sat on the deck, where the wind smelled of salt, and watched a spout of spray rise in the distance. He decided, there and then, that he would become a whale scientist too."],
    vocab: { biologist: "a scientist who studies living things", hydrophone: "a microphone that works underwater", souvenirs: "things you bring home to remember a place" },
    questions: [["What does Aunt Mei study?", ["humpback whales", "sharks", "seabirds"], 0, "retrieval"], ["Why could they hear a whale twenty kilometres away?", ["Sound travels further in water than in air.", "The whale was very large.", "They used a telescope."], 0, "retrieval"],
      ["How did the new song reach Aunt Mei's group of whales?", ["Whales learned it from others they met on their journeys.", "Scientists played it to them.", "It was carried by the wind."], 0, "inference"], ["What does \"like souvenirs\" suggest about the songs?", ["The whales bring them home as reminders of their travels.", "The songs can be bought in shops.", "The songs are very old."], 0, "language"],
      ["What did Kai decide at the end?", ["to become a whale scientist", "to never go to sea again", "to record his own song"], 0, "retrieval"]],
    grammar: Object.assign({}, DREL, { spots: ["which bobbed in the grey waters off the coast", "who studied humpback whales", "which was a microphone that worked underwater", "that meet on their journeys", "where the wind smelled of salt"],
      practice: [["Which sentence contains a relative clause?", ["Aunt Mei, who studied whales, wore headphones.", "Aunt Mei wore headphones.", "Aunt Mei studied whales and wore headphones."], 0], ["Which fits? \"The hydrophone, ___ works underwater, picked up the song.\"", ["which", "who", "where"], 0], ["Which fits? \"Kai sat on the deck, ___ the wind smelled of salt.\"", ["where", "who", "whose"], 0]] }) },
  { id: "db15-homework", band: 15, title: "Should Children Have Homework?", type: "Discussion", text: [
      "Homework has been part of school life for over a hundred years, but not everyone agrees that it is a good idea. Some people believe it is essential, while others think it should be scrapped altogether.",
      "Arguments for homework",
      "Supporters say that homework can help children to practise what they have learned in class. Times tables, spellings and reading, for example, might be remembered better if they are practised little and often. Homework could also teach useful habits, such as organising time and working independently, which will be important at secondary school. Some parents like homework because it shows them what their children are learning; it may give families a chance to talk about school together.",
      "Arguments against homework",
      "On the other hand, critics argue that homework can cause stress, especially when it is too difficult or takes too long. After a full day at school, children need time to play, rest and be with their families. Many experts believe that free play is just as important for learning as sitting at a desk.",
      "There is also a question of fairness. Some children have a quiet place to work and an adult who can help them, but others may not. This means homework could widen the gap between children.",
      "Conclusion",
      "It seems that the answer might depend on the type of homework. Short, purposeful tasks, such as reading for twenty minutes, are likely to help. Long worksheets that cause arguments at the kitchen table probably will not. Perhaps schools should ask children, as well as parents and teachers, what works best for them."],
    vocab: { essential: "absolutely necessary", independently: "on your own, without help", purposeful: "having a clear reason or aim" },
    questions: [["How long has homework been part of school life?", ["over a hundred years", "about ten years", "since last year"], 0, "retrieval"], ["What does \"essential\" mean?", ["absolutely necessary", "very boring", "too difficult"], 0, "vocabulary"],
      ["Why could homework be unfair?", ["Not every child has a quiet place or an adult to help.", "Some children are faster than others.", "Teachers give different homework."], 0, "inference"], ["Why does the writer use headings?", ["to separate the arguments for and against", "to make the text longer", "to tell a story"], 0, "structure"],
      ["What is the writer's conclusion?", ["It depends on the type of homework.", "All homework should be stopped.", "Children should have more homework."], 0, "summarising"]],
    grammar: Object.assign({}, DMOD, { spots: ["can help", "might be remembered", "could also teach", "will be important", "may give", "can cause", "may not", "could widen", "might depend", "should ask"],
      practice: [["Which modal verb shows the strongest certainty?", ["will", "might", "could"], 0], ["Which sentence shows that something is possible but not certain?", ["Homework might help children remember.", "Homework helps children remember.", "Homework helped children remember."], 0], ["Which modal verb gives advice?", ["should", "might", "can"], 0]] }) },
  { id: "db15-ibnbattuta", band: 15, title: "Ibn Battuta: The Great Traveller", type: "Biography", text: [
      "In 1325, a young man called Ibn Battuta (who was just twenty-one years old) left his home in Tangier, Morocco, to make the pilgrimage to Mecca. He expected to be away for about eighteen months. In fact, he did not return home for twenty-four years.",
      "Ibn Battuta travelled further than almost anyone else of his time – about 120,000 kilometres, according to some estimates. He crossed deserts by camel, sailed across the Indian Ocean and walked through snowy mountain passes.",
      "His journeys took him to East Africa, Persia (now Iran), India, China and many other places. In Delhi, the sultan was so impressed by his learning that he made him a judge. Later, he was chosen to lead a mission to China, although disaster struck when the ships were wrecked before they could leave India.",
      "His travels were often dangerous. He was attacked by bandits, caught in storms at sea and, on one occasion, almost drowned. Yet he remained curious about everything: the food people ate, the clothes they wore, the way they governed their cities.",
      "When he finally returned to Morocco, the sultan asked him to record his adventures. Ibn Battuta described his journeys to a writer, Ibn Juzayy, who wrote them down in a book now known as the Rihla – which means \"the journey\".",
      "Today, the Rihla is one of the most important sources we have about life in the fourteenth century. And in Dubai, a shopping centre named after Ibn Battuta is decorated with scenes from his remarkable travels."],
    vocab: { pilgrimage: "a journey to a holy place", estimates: "careful guesses", sources: "places where information comes from" },
    questions: [["Why did Ibn Battuta first leave home?", ["to make the pilgrimage to Mecca", "to become a judge", "to visit China"], 0, "retrieval"], ["How long was he away from home?", ["twenty-four years", "eighteen months", "five years"], 0, "retrieval"],
      ["What job was he given in Delhi?", ["judge", "sultan", "sailor"], 0, "retrieval"], ["What does the text suggest about his character?", ["He was brave and endlessly curious.", "He was lazy and careless.", "He disliked meeting people."], 0, "inference"],
      ["Why is the Rihla important today?", ["It tells us about life in the fourteenth century.", "It is the oldest book in the world.", "It was written by a sultan."], 0, "retrieval"]],
    grammar: Object.assign({}, DPAR, { spots: ["(who was just twenty-one years old)", "– about 120,000 kilometres, according to some estimates", "(now Iran)", "– which means \"the journey\""],
      practice: [["Which part is the parenthesis? \"Persia (now Iran) was one of his stops.\"", ["now Iran", "Persia", "was one of his stops"], 0], ["Which sentence uses dashes for parenthesis correctly?", ["The journey – which lasted years – changed his life.", "The journey – which lasted years changed his life.", "The – journey which lasted years – changed his life."], 0], ["Which sentence uses commas instead of brackets correctly?", ["Ibn Battuta, a young scholar, left Tangier.", "Ibn Battuta a young scholar, left Tangier.", "Ibn Battuta, a young scholar left, Tangier."], 0]] }) },
  { id: "db15-mangroves", band: 15, title: "Mangroves: Forests Between Land and Sea", type: "Information", text: [
      "Along the coast of the UAE, where the land meets the sea, grow some of the toughest trees on Earth. They are called mangroves, and they can survive in salty water that would kill most other plants.",
      "The most common mangrove in the UAE is the grey mangrove, which can grow several metres tall. Its secret lies in its roots. Some roots, which are called pneumatophores, poke up out of the mud like hundreds of pencils. They help the tree to breathe when the tide is high. The leaves, which have tiny glands, get rid of extra salt; on a hot day, you can sometimes see salt crystals sparkling on them.",
      "Mangrove forests are home to many creatures. Crabs scuttle across the mud, herons hunt in the shallows and young fish, which need somewhere safe to grow, hide among the tangled roots. Without mangroves, there would be far fewer fish in the sea.",
      "Mangroves also protect people. Their roots hold the soil together and slow down waves, which helps to stop coastlines from washing away during storms. They are also excellent at storing carbon, which helps to tackle climate change.",
      "In the past, many mangrove forests around the world were cut down to make space for buildings. Today, the UAE is one of the countries that are planting millions of new mangroves. Visitors can paddle kayaks through the mangrove channels in Abu Dhabi, where they might spot turtles, crabs and herons."],
    vocab: { glands: "tiny parts of a plant or animal that release something", scuttle: "move quickly with short steps", carbon: "a substance that, as a gas, warms the planet" },
    questions: [["What do pneumatophores help the tree to do?", ["breathe when the tide is high", "drink fresh water", "grow fruit"], 0, "retrieval"], ["How does the grey mangrove get rid of extra salt?", ["through tiny glands in its leaves", "through its flowers", "it stores it in its trunk"], 0, "retrieval"],
      ["What does \"scuttle\" mean?", ["move quickly with short steps", "swim slowly", "sleep in the mud"], 0, "vocabulary"], ["Why would there be fewer fish without mangroves?", ["Young fish shelter among the roots while they grow.", "Mangroves make the water warmer.", "Fish eat mangrove leaves."], 0, "inference"],
      ["Which is the best summary of the fourth paragraph?", ["Mangroves protect coastlines and help tackle climate change.", "Mangroves are home to crabs.", "Mangroves grow in Abu Dhabi."], 0, "summarising"]],
    grammar: Object.assign({}, DREL, { spots: ["where the land meets the sea", "which can grow several metres tall", "which are called pneumatophores", "which have tiny glands", "which need somewhere safe to grow", "which helps to stop coastlines from washing away during storms", "which helps to tackle climate change", "that are planting millions of new mangroves", "where they might spot turtles, crabs and herons"],
      practice: [["Which relative pronoun is used for places?", ["where", "who", "whose"], 0], ["Which fits? \"The grey mangrove, ___ grows in the UAE, is very tough.\"", ["which", "who", "where"], 0], ["Which sentence contains a relative clause?", ["Young fish, which need shelter, hide in the roots.", "Young fish hide in the roots.", "Young fish need shelter and hide."], 0]] }) },
  { id: "db15-ificould", band: 15, title: "If I Could", type: "Poem", text: [
      "If I could, I would bottle the sound of the rain,",
      "And open it slowly on dry summer days.",
      "I might plant a garden on top of a cloud,",
      "Where sunflowers could stretch in a thousand bright ways.",
      "I should, I suppose, tidy up my room first;",
      "I must feed the cat, and I can't miss the bus.",
      "But tonight, when the house is all quiet and still,",
      "I may build a ship out of moonlight and dust.",
      "I could sail it to places that no one has seen,",
      "Where the mountains are glass and the rivers are song,",
      "And if you would like to, you might come with me:",
      "There's room for us both, and the night will be long."],
    vocab: { suppose: "think something is probably true", still: "calm and not moving" },
    questions: [["What would the poet like to bottle?", ["the sound of the rain", "moonlight", "sunflowers"], 0, "retrieval"], ["What must the poet do?", ["feed the cat", "build a ship", "plant a garden"], 0, "retrieval"],
      ["\"Where the mountains are glass and the rivers are song\" describes…", ["an imaginary, magical place", "a real country", "the poet's school"], 0, "language"], ["How is the second verse different from the others?", ["It lists real jobs the poet has to do.", "It asks questions.", "It is about the cat."], 0, "structure"],
      ["Who is the poet talking to at the end?", ["the reader, as a friend", "the cat", "their teacher"], 0, "inference"]],
    grammar: Object.assign({}, DMOD, { spots: ["If I could", "I would bottle", "I might plant", "could stretch", "I should", "I must feed", "I can't miss", "I may build", "I could sail", "you would like", "you might come", "will be long"],
      practice: [["Which modal verb shows that something must be done?", ["must", "might", "could"], 0], ["Which line shows the poet is not sure?", ["I might plant a garden on top of a cloud.", "I must feed the cat.", "I can't miss the bus."], 0], ["Which modal verb sounds most certain?", ["will", "may", "might"], 0]] }) },
  { id: "db15-painting", band: 15, title: "The Missing Painting", type: "Playscript", text: [
      "Characters: DETECTIVE NOOR, MR GRANT (the museum guard), MS LOPEZ (the museum director), SAM (a young visitor)",
      "(A museum gallery at night. An empty frame hangs on the wall. MR GRANT paces nervously.)",
      "MS LOPEZ: (horrified) It's gone! The Golden Falcon – our most valuable painting – has vanished!",
      "MR GRANT: I was here all night, I promise. I only left once (for five minutes, to make tea).",
      "DETECTIVE NOOR: (examining the frame with a magnifying glass) Five minutes is plenty of time for a thief. Who else was in the building?",
      "MS LOPEZ: Nobody. The doors were locked at six o'clock.",
      "SAM: (stepping out from behind a statue) Er… that's not quite true.",
      "(Everyone turns to stare.)",
      "DETECTIVE NOOR: And who are you?",
      "SAM: Sam. I was on the school trip this afternoon, and I got lost. Well – I hid, actually. I wanted to see the museum at night. And I saw something! At nine o'clock, a man in a cleaner's uniform took the painting down. He put it behind that cupboard.",
      "MR GRANT: (suspiciously) A likely story!",
      "(DETECTIVE NOOR crosses to the cupboard and pulls it away from the wall. Behind it, wrapped in a sheet, is the painting.)",
      "DETECTIVE NOOR: The thief planned to collect it later, when the coast was clear. Clever – but not clever enough.",
      "MS LOPEZ: (hugging the painting) Sam, you've saved the Golden Falcon!",
      "DETECTIVE NOOR: (smiling) Although next time, Sam, perhaps you should stay with your class.",
      "(The lights fade.)"],
    vocab: { horrified: "very shocked and upset", suspiciously: "in a way that shows you don't trust someone", examining: "looking at very carefully" },
    questions: [["What is the name of the missing painting?", ["The Golden Falcon", "The Silver Moon", "The Museum at Night"], 0, "retrieval"], ["Why did Mr Grant leave his post?", ["to make tea", "to chase the thief", "to lock the doors"], 0, "retrieval"],
      ["Where was the painting found?", ["behind the cupboard, wrapped in a sheet", "in Sam's bag", "under a statue"], 0, "retrieval"], ["Why does Mr Grant say \"A likely story!\"?", ["He doesn't believe Sam.", "He is pleased with Sam.", "He wants to hear a story."], 0, "inference"],
      ["Why are the characters' names written in capital letters?", ["to show who is speaking", "because they are shouting", "because they are famous"], 0, "structure"]],
    grammar: Object.assign({}, DPAR, { focus: "Brackets and dashes in a playscript", explain: "In a playscript, brackets show stage directions: what the actors do or how they speak. Inside sentences, brackets and dashes add extra information (parenthesis), just as they do in stories.",
      spots: ["(horrified)", "– our most valuable painting –", "(for five minutes, to make tea)", "(examining the frame with a magnifying glass)", "(suspiciously)"],
      practice: [["In a playscript, what do brackets usually show?", ["stage directions", "the character's name", "the title"], 0], ["Which part is the parenthesis? \"The Golden Falcon – our most valuable painting – has vanished!\"", ["our most valuable painting", "The Golden Falcon", "has vanished"], 0], ["Which line is set out correctly?", ["SAM: (nervously) I hid.", "(SAM): nervously I hid.", "SAM nervously: I hid ()."], 0]] }) }
];


TEST_A[15] = DARKBLUE_A; TEST_B[15] = DARKBLUE_B; TEXTS.push(...DARKBLUE_TEXTS);

/* =================== BLUE BAND: full set =================== */
/* BLUE BAND (5) · Year 1 · reading age 5y6m–6y · RWI Purple
   Grammar: capital letters and full stops; capital letters for names and for 'I' */
const BLUE_A = [
  ["The dog ran to get the ___.", ["ball", "sing", "red", "jump"], 0], ["I can see a fish in the ___.", ["pond", "sad", "hop", "cup"], 0],
  ["Mum put the hat on her ___.", ["head", "run", "big", "sun"], 0], ["The cat is wet. It sat in the ___.", ["rain", "sock", "fast", "ten"], 0],
  ["I can see a big red ___.", ["bus", "run", "sing", "hot"], 0], ["The cat sat on the ___.", ["mat", "sad", "hop", "ten"], 0],
  ["A hen lays an ___.", ["egg", "cup", "sun", "dog"], 0], ["We go to bed at ___.", ["night", "jump", "green", "cake"], 0],
  ["Dad has a cup of ___.", ["tea", "sea", "bee", "tree"], 0], ["The pig is in the ___.", ["mud", "sky", "cup", "hat"], 0],
  ["I lick my ice ___.", ["cream", "tree", "rain", "box"], 0], ["The duck can ___.", ["swim", "cook", "read", "write"], 0],
  ["I put my socks on my ___.", ["feet", "ears", "nose", "hands"], 0], ["The sun is ___.", ["hot", "wet", "sad", "cold"], 0],
  ["A frog can ___ in the pond.", ["hop", "sing", "bake", "read"], 0], ["We dig in the sand with a ___.", ["spade", "cake", "bed", "coat"], 0],
  ["The bird sings in the ___.", ["tree", "bath", "box", "shoe"], 0], ["I can see six ___ on the farm.", ["sheep", "sun", "milk", "rain"], 0],
  ["Kim has a pet ___.", ["fish", "dish", "wish", "rush"], 0], ["The fox ran into the ___.", ["wood", "wool", "hood", "food"], 0],
  ["I sleep in my ___.", ["bed", "bag", "bun", "bat"], 0], ["The ship is on the ___.", ["sea", "see", "bee", "tea"], 0],
  ["We had chips for ___.", ["lunch", "bunch", "punch", "munch"], 0], ["A cow says ___.", ["moo", "quack", "woof", "tweet"], 0],
  ["I brush my hair with a ___.", ["brush", "crush", "rush", "blush"], 0], ["The moon shines at ___.", ["night", "light", "right", "kite"], 0],
  ["I can kick the ___.", ["ball", "tall", "call", "fall"], 0], ["The king has a gold ___.", ["crown", "clown", "cloud", "crowd"], 0],
  ["It is wet, so I get my ___.", ["coat", "boat", "goat", "moat"], 0], ["I wash my hands in the ___.", ["sink", "pink", "wink", "think"], 0]
];
const BLUE_B = [
  { title: "Sam and Rex", text: ["Sam has a big dog. The dog is called Rex. Rex likes to run in the park.", "One day, Rex ran into the pond! Splash! Rex got wet. Sam got wet too.", "Mum had a towel. She dried Rex and Sam. Then they all went home for tea."],
    q: [["What is the dog called?", ["Rex", "Sam", "Mum"], 0, "retrieval"], ["Where did Rex run?", ["into the pond", "into the shop", "up a tree"], 0, "retrieval"], ["Who dried Rex and Sam?", ["Mum", "Dad", "Gran"], 0, "retrieval"], ["What did they do at the end?", ["went home for tea", "went to the pond", "went to bed"], 0, "sequencing"]] },
  { title: "Hens", text: ["Hens are birds. They live on farms. Hens have feathers and wings, but they can not fly far.", "A hen lays eggs in a nest. Baby hens are called chicks. Chicks are small and yellow.", "Hens peck at seeds and bugs."],
    q: [["Where do hens live?", ["on farms", "in the sea", "in shops"], 0, "retrieval"], ["What are baby hens called?", ["chicks", "kittens", "pups"], 0, "retrieval"], ["What do hens eat?", ["seeds and bugs", "fish", "cake"], 0, "retrieval"], ["Can hens fly far?", ["no", "yes", "only at night"], 0, "retrieval"]] },
  { title: "My Hat", text: ["I have a hat,", "A big red hat.", "It fits my head,", "It fits my cat!", "I wear my hat", "When it is hot.", "I like my hat,", "I like it a lot!"],
    q: [["What colour is the hat?", ["red", "blue", "green"], 0, "retrieval"], ["When does the child wear the hat?", ["when it is hot", "when it is wet", "at night"], 0, "retrieval"], ["Who else does the hat fit?", ["the cat", "the dog", "Mum"], 0, "retrieval"], ["Which word rhymes with \"hat\"?", ["cat", "red", "hot"], 0, "language"]] }
];
const BCAP = { focus: "Capital letters and full stops", explain: "A sentence starts with a capital letter and ends with a full stop." };
const BNAME = { focus: "Capital letters for names and I", explain: "Names of people, places and days start with a capital letter. The word I is always a capital letter." };
const capPractice = [["Which sentence is written correctly?", ["The bike is red.", "the bike is red.", "The bike is red"], 0], ["What goes at the end of a sentence?", ["a full stop", "a capital letter", "a name"], 0], ["What does a sentence start with?", ["a capital letter", "a full stop", "a small letter"], 0]];
const BLUE_TEXTS = [
  { id: "b5-tom", band: 5, title: "Tom's Big Day", type: "Story", text: ["Tom has a red bike. It is new. Tom gets on the bike. He rides to the shop.", "He rides up the hill. He rides down the hill. Then Tom falls off! He is sad.", "Mum helps him up. Tom gets back on the bike. Now he can ride all the way home. Tom is a big boy now!"],
    vocab: { hill: "a high bit of land", rides: "goes along on a bike" },
    questions: [["What colour is Tom's bike?", ["red", "blue", "green"], 0, "retrieval"], ["What happened after Tom rode down the hill?", ["He fell off.", "He went to bed.", "He had lunch."], 0, "sequencing"], ["Who helps Tom up?", ["Mum", "Dad", "his friend"], 0, "retrieval"], ["How does Tom feel at the end?", ["proud", "sad", "cross"], 0, "inference"]],
    grammar: Object.assign({}, BCAP, { spots: ["Tom has a red bike.", "It is new.", "He is sad.", "Mum helps him up."], practice: capPractice }) },
  { id: "b5-teddy", band: 5, title: "The Lost Teddy", type: "Story", text: ["Mia has a teddy called Bob. Bob goes everywhere with Mia.", "One day, Mia went to see Gran. When she got home, Bob was not in her bag! \"I have lost Bob!\" said Mia.", "Dad and Mia went back to Gran's house. Gran had Bob on her chair. \"I found him!\" said Gran.", "Mia gave Bob a big hug. \"I will not lose you again,\" she said."],
    vocab: { everywhere: "all the places", hug: "holding someone close in your arms" },
    questions: [["What is the teddy called?", ["Bob", "Mia", "Gran"], 0, "retrieval"], ["Who did Mia go to see?", ["Gran", "her teacher", "her friend"], 0, "retrieval"], ["Where was Bob?", ["on Gran's chair", "in the car", "in the bath"], 0, "retrieval"], ["How did Mia feel when she got Bob back?", ["happy", "cross", "sleepy"], 0, "inference"]],
    grammar: Object.assign({}, BNAME, { spots: ["Mia", "Bob", "Gran", "Dad", "I have lost Bob", "I found him", "I will not lose you again"],
      practice: [["Which sentence is written correctly?", ["Mia has a teddy.", "mia has a teddy.", "Mia has a Teddy."], 0], ["Which word always needs a capital letter?", ["I", "a", "the"], 0], ["Which name is written correctly?", ["Gran", "gran", "gRAN"], 0]] }) },
  { id: "b5-park", band: 5, title: "A Trip to the Park", type: "Story", text: ["On Friday, Adam and his sister Lena went to the park with Dad. Adam went on the swings. Lena went down the slide. \"I can go so high!\" said Adam.", "Then they fed the ducks. Dad had a bag of seeds. The ducks went quack, quack, quack!", "After that, they had ice cream. Lena had a pink one. Adam had a brown one. \"I love the park,\" said Lena."],
    vocab: { swings: "seats on ropes that go back and forth", slide: "a slope you go down" },
    questions: [["Who went down the slide?", ["Lena", "Adam", "Dad"], 0, "retrieval"], ["What did they feed the ducks?", ["seeds", "bread", "ice cream"], 0, "retrieval"], ["What colour was Lena's ice cream?", ["pink", "brown", "white"], 0, "retrieval"], ["What did they do last?", ["had ice cream", "fed the ducks", "went on the swings"], 0, "sequencing"]],
    grammar: Object.assign({}, BNAME, { spots: ["Friday", "Adam", "Lena", "Dad", "I can go so high", "I love the park"],
      practice: [["Which day is written correctly?", ["Friday", "friday", "fRiday"], 0], ["Which sentence is written correctly?", ["Adam and Lena went to the park.", "adam and lena went to the park.", "Adam and lena went to the park."], 0], ["Why does \"Lena\" start with a capital letter?", ["It is a name.", "It is a long word.", "It is at the end."], 0]] }) },
  { id: "b5-swim", band: 5, title: "Ben Can Swim", type: "Story", text: ["Ben is in the pool. He has red armbands. Ben kicks his legs. He moves his arms. Splash, splash, splash!", "Then the teacher takes off his armbands. Ben is a bit scared. He kicks and kicks. He swims to the end of the pool!", "The teacher claps. Mum claps too. Ben gets a sticker. It says: Well done!"],
    vocab: { armbands: "floats you wear on your arms in the water", pool: "a big place filled with water for swimming" },
    questions: [["What colour are Ben's armbands?", ["red", "blue", "yellow"], 0, "retrieval"], ["How does Ben feel when the armbands come off?", ["a bit scared", "very cross", "sleepy"], 0, "retrieval"], ["Where does Ben swim to?", ["the end of the pool", "the sea", "his mum"], 0, "retrieval"], ["What does Ben get?", ["a sticker", "a cake", "a ball"], 0, "retrieval"]],
    grammar: Object.assign({}, BCAP, { spots: ["Ben is in the pool.", "He has red armbands.", "Ben kicks his legs.", "He moves his arms."],
      practice: [["Which sentence is finished correctly?", ["Ben can swim.", "Ben can swim", "ben can swim"], 0], ["Which is written correctly?", ["The teacher claps.", "the teacher claps.", "The teacher claps"], 0], ["What does a sentence start with?", ["a capital letter", "a full stop", "a small letter"], 0]] }) },
  { id: "b5-cats", band: 5, title: "Cats", type: "Information", text: ["Cats are pets. They have soft fur and long tails. Cats can see well at night.", "They like to sleep a lot. A cat can sleep for most of the day! Cats like to play with balls and string. They clean their fur with their tongues.", "Baby cats are called kittens. Kittens drink milk from their mum."],
    vocab: { fur: "the soft hair on an animal", kittens: "baby cats" },
    questions: [["What are baby cats called?", ["kittens", "puppies", "chicks"], 0, "retrieval"], ["How do cats clean their fur?", ["with their tongues", "in the bath", "with a brush"], 0, "retrieval"], ["When can cats see well?", ["at night", "only in the sun", "never"], 0, "retrieval"], ["What do kittens drink?", ["milk from their mum", "juice", "water from the sea"], 0, "retrieval"]],
    grammar: Object.assign({}, BCAP, { spots: ["Cats are pets.", "They have soft fur and long tails.", "Baby cats are called kittens."], practice: capPractice }) },
  { id: "b5-moon", band: 5, title: "The Moon", type: "Information", text: ["The Moon is in the sky. We can see it at night. The Moon is a big ball of rock.", "It looks bright, but it has no light of its own. The Sun shines on it. The Moon can look like a ball, or a thin slice.", "People have been to the Moon in a rocket! They walked on it and left footprints in the dust."],
    vocab: { rocket: "a machine that flies into space", footprints: "marks left by feet" },
    questions: [["What is the Moon made of?", ["rock", "cheese", "water"], 0, "retrieval"], ["Why does the Moon look bright?", ["The Sun shines on it.", "It has lamps.", "It is on fire."], 0, "retrieval"], ["How did people get to the Moon?", ["in a rocket", "in a car", "on a plane"], 0, "retrieval"], ["What did people leave on the Moon?", ["footprints in the dust", "a tree", "a house"], 0, "retrieval"]],
    grammar: Object.assign({}, BCAP, { spots: ["The Moon is in the sky.", "We can see it at night.", "The Sun shines on it."], practice: capPractice }) },
  { id: "b5-school", band: 5, title: "My School", type: "Recount", text: ["My name is Zara. I am in Year 1. My teacher is Mrs Khan. I sit next to my friend Ali.", "In the morning, we read books. I like books about animals. At lunch, I eat a sandwich and an apple.", "In the afternoon, we paint. I painted a big green frog! At home time, my mum picks me up. I tell her all about my day."],
    vocab: { afternoon: "the part of the day after lunch", sandwich: "bread with food in the middle" },
    questions: [["What is the teacher called?", ["Mrs Khan", "Zara", "Ali"], 0, "retrieval"], ["Who does Zara sit next to?", ["Ali", "Mrs Khan", "her mum"], 0, "retrieval"], ["What did Zara paint?", ["a big green frog", "a red bus", "her school"], 0, "retrieval"], ["What does Zara eat at lunch?", ["a sandwich and an apple", "pizza", "soup"], 0, "retrieval"]],
    grammar: Object.assign({}, BNAME, { spots: ["Zara", "I am", "Mrs Khan", "Ali", "I like", "I eat", "I painted", "I tell"],
      practice: [["Which sentence is written correctly?", ["My teacher is Mrs Khan.", "My teacher is mrs khan.", "my teacher is Mrs Khan."], 0], ["Which word always needs a capital letter?", ["I", "my", "the"], 0], ["Which name is written correctly?", ["Ali", "ali", "aLI"], 0]] }) },
  { id: "b5-sandwich", band: 5, title: "How to Make a Sandwich", type: "Instructions", text: ["You will need: two slices of bread, butter, cheese and a knife.", "1. Spread butter on the bread.", "2. Put the cheese on one slice.", "3. Put the other slice on top.", "4. Cut the sandwich in half.", "5. Put it on a plate. Now you can eat it. Yum!"],
    vocab: { spread: "make it cover the top in a thin layer", slice: "a thin, flat piece" },
    questions: [["What do you put on the bread first?", ["butter", "cheese", "jam"], 0, "sequencing"], ["What do you do after you put the other slice on top?", ["Cut the sandwich in half.", "Spread the butter.", "Get the bread."], 0, "sequencing"], ["What do you need to cut the sandwich?", ["a knife", "a spoon", "a cup"], 0, "retrieval"], ["How many slices of bread do you need?", ["two", "one", "three"], 0, "retrieval"]],
    grammar: Object.assign({}, BCAP, { spots: ["Spread butter on the bread.", "Put the cheese on one slice.", "Cut the sandwich in half."],
      practice: [["Which instruction is written correctly?", ["Put it on a plate.", "put it on a plate.", "Put it on a plate"], 0], ["What goes at the end of an instruction?", ["a full stop", "a capital letter", "a name"], 0], ["What does an instruction start with?", ["a capital letter", "a full stop", "a number only"], 0]] }) },
  { id: "b5-ilike", band: 5, title: "I Like", type: "Poem", text: ["I like the sun,", "I like the rain,", "I like to ride", "On a big red train.", "I like my mum,", "I like my dad,", "I like my cat", "Even when she's bad!", "I like my friends,", "Sam, Jo and Lee,", "And I know that", "They all like me!"],
    vocab: { train: "a long vehicle that goes on rails" },
    questions: [["What does the poet like to ride on?", ["a big red train", "a bike", "a bus"], 0, "retrieval"], ["Who are the poet's friends?", ["Sam, Jo and Lee", "Mum and Dad", "the cat"], 0, "retrieval"], ["Which word rhymes with \"rain\"?", ["train", "sun", "cat"], 0, "language"], ["How do the friends feel about the poet?", ["They like the poet.", "They are cross.", "They don't know the poet."], 0, "inference"]],
    grammar: Object.assign({}, BNAME, { spots: ["I like", "Sam", "Jo", "Lee", "I know"],
      practice: [["Which is written correctly?", ["I like the rain.", "i like the rain.", "I Like the rain."], 0], ["Which names are written correctly?", ["Sam, Jo and Lee", "sam, jo and lee", "Sam, jo and Lee"], 0], ["Why does \"I\" have a capital letter?", ["It is always a capital when it means me.", "It is at the start of a line only.", "It is a short word."], 0]] }) },
  { id: "b5-splash", band: 5, title: "Splash!", type: "Poem", text: ["Rain on the window,", "Rain on the street,", "Big boots on my feet.", "Splash!", "Puddles are big.", "Puddles are deep.", "I jump in them all.", "Splash!", "Then I am wet.", "Then I am cold.", "Mum says, \"Come in!\"", "So I do as I am told."],
    vocab: { puddles: "small pools of rain on the ground", deep: "going a long way down" },
    questions: [["Where is the rain?", ["on the window and the street", "in the bath", "in the cup"], 0, "retrieval"], ["What does the child jump in?", ["puddles", "the pool", "the sea"], 0, "retrieval"], ["How does the child feel after jumping?", ["wet and cold", "hot and dry", "sleepy"], 0, "retrieval"], ["What does Mum say?", ["Come in!", "Go out!", "Splash!"], 0, "retrieval"]],
    grammar: Object.assign({}, BCAP, { spots: ["Puddles are big.", "Puddles are deep.", "I jump in them all."], practice: capPractice }) }
];


TEST_A[5] = BLUE_A; TEST_B[5] = BLUE_B; TEXTS.push(...BLUE_TEXTS);

/* =================== ORANGE BAND: full set =================== */
/* ORANGE BAND (7) · Year 1 · reading age 6y3m–6y6m · RWI Orange
   Grammar: question marks and exclamation marks; suffixes -ing, -ed, -er, -est (no change to the root word); prefix un- */
const ORANGE_A = [
  ["When it started to rain, Mia opened her ___.", ["umbrella", "garden", "pencil", "ladder"], 0], ["The baker took the hot bread out of the ___.", ["oven", "river", "cloud", "pocket"], 0],
  ["Tom was so tired that he ___ asleep on the sofa.", ["fell", "ate", "sang", "threw"], 0], ["The children clapped because the show was ___.", ["wonderful", "hungry", "empty", "tidy"], 0],
  ["The little boy was ___ because he had lost his kite.", ["unhappy", "unlock", "undo", "unpack"], 0], ["Grandma ___ a cake for my birthday.", ["baked", "barked", "banked", "basked"], 0],
  ["The giraffe is the ___ animal in the zoo.", ["tallest", "taller", "tall", "tallness"], 0], ["We ___ to the beach on Saturday.", ["went", "want", "wet", "west"], 0],
  ["The puppy was ___ in the garden.", ["playing", "plays", "play", "player"], 0], ["Please hang your coat on the ___.", ["hook", "book", "look", "cook"], 0],
  ["My brother is ___ than me.", ["older", "oldest", "old", "olden"], 0], ["The children ___ when the clown fell over.", ["laughed", "laughing", "laughs", "laugh"], 0],
  ["The ___ sang a sweet song in the tree.", ["bird", "bed", "bud", "bard"], 0], ["I could not ___ the box, so Dad helped me.", ["open", "oven", "often", "over"], 0],
  ["The snowman began to ___ in the sun.", ["melt", "meet", "malt", "mitt"], 0], ["Ali is the ___ runner in our class.", ["fastest", "faster", "fast", "fasting"], 0],
  ["The farmer ___ the cows into the barn.", ["led", "let", "lid", "lad"], 0], ["The ice was cold and ___.", ["slippery", "slipper", "slipped", "sloppy"], 0],
  ["We ___ the door and went inside.", ["unlocked", "unlucky", "unkind", "unwell"], 0], ["It was dark, so the children were a bit ___.", ["scared", "scarf", "scarce", "scored"], 0],
  ["The dragon breathed ___.", ["fire", "fine", "five", "file"], 0], ["Mum ___ the baby to sleep.", ["rocked", "racked", "rooked", "ricked"], 0],
  ["My ___ ran away with my sock!", ["puppy", "poppy", "puffy", "puppet"], 0], ["The water in the bath was too ___.", ["hot", "hat", "hut", "hit"], 0],
  ["We ___ along the beach looking for shells.", ["walked", "walking", "walks", "walk"], 0], ["The queen lives in a big ___.", ["castle", "cattle", "kettle", "candle"], 0],
  ["It is ___ to cross the road without looking.", ["unsafe", "unpack", "undo", "untie"], 0], ["The kitten is ___ than the cat.", ["smaller", "smallest", "small", "smalls"], 0],
  ["Who ___ the window yesterday?", ["opened", "opening", "opens", "open"], 0], ["Look at the ___ in the sky!", ["rainbow", "raining", "rainy", "rained"], 0]
];
const ORANGE_B = [
  { title: "Pip's Big Jump", text: ["Pip was a little frog. All his friends could jump over the log, but Pip could not. \"I am too small!\" he said sadly.", "Every day, Pip practised. He jumped and jumped. His legs got stronger and stronger.", "One morning, Pip took a big run. Hop, hop, HOP! He sailed right over the log! \"You did it!\" shouted his friends. Pip was the happiest frog in the pond."],
    q: [["What could Pip not do at first?", ["jump over the log", "swim in the pond", "talk to his friends"], 0, "retrieval"], ["What did Pip do every day?", ["practised jumping", "slept on the log", "ate flies"], 0, "retrieval"], ["How did Pip feel at the end?", ["very happy", "sad", "tired"], 0, "inference"], ["\"He sailed right over the log\" means he…", ["jumped smoothly through the air", "went on a boat", "fell in the water"], 0, "vocabulary"]] },
  { title: "Penguins", text: ["Penguins are birds, but they cannot fly. Instead, they are amazing swimmers. Their wings work like flippers in the water.", "Most penguins live in cold places near the South Pole. They have thick feathers and a layer of fat to keep them warm.", "Penguins eat fish, squid and tiny shrimp called krill. Some penguins slide on their tummies across the ice!"],
    q: [["Can penguins fly?", ["no", "yes", "only at night"], 0, "retrieval"], ["What keeps penguins warm?", ["thick feathers and a layer of fat", "the sun", "their nests"], 0, "retrieval"], ["What is krill?", ["tiny shrimp", "a kind of ice", "a big fish"], 0, "vocabulary"], ["How do some penguins move across the ice?", ["They slide on their tummies.", "They fly.", "They ride on whales."], 0, "retrieval"]] },
  { title: "What Am I?", text: ["I have a face, but I can't smile.", "I have two hands, but I can't wave.", "I tick and tock all day and night.", "I tell you when it's time to play.", "What am I?"],
    q: [["What is the answer to the riddle?", ["a clock", "a cat", "a book"], 0, "inference"], ["What sound does it make?", ["tick and tock", "moo", "beep"], 0, "retrieval"], ["What can't it do with its hands?", ["wave", "tick", "tell the time"], 0, "retrieval"], ["Why does the poem end with a question mark?", ["It asks you to guess the answer.", "It is shouting.", "It is the end of a list."], 0, "structure"]] }
];
const OPUNCT = { focus: "Question marks and exclamation marks", explain: "A question mark ? goes at the end of a question. An exclamation mark ! shows a strong feeling, like surprise, or something said loudly." };
const OSUF = { focus: "Adding -ing, -ed, -er and -est", explain: "We add -ing and -ed to doing words (jump → jumping, jumped). We add -er to compare two things (fast → faster) and -est to compare three or more (fast → fastest)." };
const OUN = { focus: "The prefix un-", explain: "Adding un- to the start of a word changes its meaning to the opposite: happy → unhappy (not happy), lock → unlock." };
const punctPractice = [["Which sentence should end with a question mark?", ["Where is my cat", "My cat is lost", "I like cats"], 0], ["Which sentence needs an exclamation mark?", ["What a big surprise", "Is it raining", "The cat is black"], 0], ["Which mark goes at the end? \"Can you help me\"", ["?", "!", ","], 0]];
const ORANGE_TEXTS = [
  { id: "o7-dragon", band: 7, title: "The Unhappy Dragon", type: "Story", text: ["Flame the dragon was unhappy. Nobody came to play with him. \"They think I am unkind,\" he sighed. \"But I am not!\"", "One day, Flame saw a little girl called Rosie. She was trying to open a big gate, but it was locked. \"Oh no!\" said Rosie. \"I am stuck!\"", "Flame flew down. He blew a tiny puff of fire on the lock. Click! The gate came unlocked. Rosie was not scared. \"Thank you!\" she said. \"You are not unkind at all. You are helpful!\"", "The next day, Rosie came back with her friends. They played tag in the field until the sun went down. Flame was not unhappy any more."],
    vocab: { sighed: "let out a long, sad breath", helpful: "good at helping" },
    questions: [["Why was Flame unhappy?", ["Nobody came to play with him.", "He was hungry.", "He lost his fire."], 0, "retrieval"], ["What was Rosie trying to do?", ["open a big locked gate", "find her dog", "climb a tree"], 0, "retrieval"], ["How did Flame help Rosie?", ["He blew fire on the lock.", "He carried her home.", "He found a key."], 0, "retrieval"], ["How did Flame feel at the end?", ["happy", "unhappy", "scared"], 0, "inference"]],
    grammar: Object.assign({}, OUN, { spots: ["unhappy", "unkind", "unlocked"], practice: [["What does \"unhappy\" mean?", ["not happy", "very happy", "happy again"], 0], ["Add un- to \"lock\".", ["unlock", "relock", "lockun"], 0], ["Which word means \"not kind\"?", ["unkind", "kinder", "kindest"], 0]] }) },
  { id: "o7-race", band: 7, title: "Fast, Faster, Fastest", type: "Story", text: ["It was sports day. Ali, Sam and Rami lined up for the big race. \"I am fast!\" said Ali. \"I am faster!\" said Sam. \"I am the fastest!\" said Rami.", "Bang! The race started. Rami was the quickest of all, but then he tripped on his lace! Ali stopped and helped him up. Sam stopped too.", "The three boys walked to the finish line together, holding hands. Everyone cheered and clapped. \"That was the kindest thing I have ever seen,\" said their teacher. She gave them each a gold sticker.", "Rami grinned. \"Being kind is better than being fast,\" he said."],
    vocab: { tripped: "caught your foot and nearly fell", cheered: "shouted to show you are happy" },
    questions: [["Who said \"I am the fastest\"?", ["Rami", "Ali", "Sam"], 0, "retrieval"], ["What happened to Rami?", ["He tripped on his lace.", "He won the race.", "He went home."], 0, "retrieval"], ["What did Ali do?", ["stopped and helped Rami up", "ran to the finish", "laughed at Rami"], 0, "retrieval"], ["What did Rami learn?", ["Being kind is better than being fast.", "He should run faster.", "Races are boring."], 0, "inference"]],
    grammar: Object.assign({}, OSUF, { spots: ["faster", "fastest", "quickest", "kindest"], practice: [["tall, taller, ___", ["tallest", "tallist", "tallerest"], 0], ["Which word compares two things?", ["faster", "fastest", "fast"], 0], ["Which fits? \"Rami was the ___ runner.\"", ["quickest", "quicker", "quick"], 0]] }) },
  { id: "o7-max", band: 7, title: "Where Is Max?", type: "Story", text: ["Max the cat was missing! \"Where is Max?\" asked Ellie.", "\"Is he in the garden?\" asked Dad. They looked in the garden. No Max! \"Is he under the bed?\" asked Mum. They looked under the bed. No Max!", "Ellie began to cry. Then she heard a tiny noise. Meow! It was coming from the washing basket.", "Ellie lifted the clothes. There was Max, curled up asleep on a warm towel! \"You silly cat!\" laughed Ellie. \"How did you get in there?\" Max just yawned and went back to sleep."],
    vocab: { missing: "lost, cannot be found", yawned: "opened his mouth wide because he was sleepy" },
    questions: [["Where did they look first?", ["in the garden", "under the bed", "in the basket"], 0, "sequencing"], ["Where was Max?", ["in the washing basket", "in the garden", "on the roof"], 0, "retrieval"], ["What was Max doing?", ["sleeping on a warm towel", "eating his dinner", "chasing a mouse"], 0, "retrieval"], ["How did Ellie feel when she found Max?", ["happy and relieved", "angry", "scared"], 0, "inference"]],
    grammar: Object.assign({}, OPUNCT, { spots: ["Where is Max?", "Is he in the garden?", "No Max!", "Is he under the bed?", "Meow!", "You silly cat!", "How did you get in there?"], practice: punctPractice }) },
  { id: "o7-pancakes", band: 7, title: "Making Pancakes", type: "Recount", text: ["On Sunday, Dad and I made pancakes. First, we cracked two eggs into a bowl. Then we added milk and flour. I mixed it all together with a big whisk.", "Dad heated the pan and poured in some mix. When the pancake was ready, Dad tossed it in the air. It landed on the floor! We laughed and laughed.", "Our dog, Toffee, was waiting. She jumped up and gobbled it! Dad cooked another one, and this time he caught it.", "We ate our pancakes with honey and bananas. They were the best pancakes ever!"],
    vocab: { whisk: "a tool for mixing things fast", tossed: "threw up into the air" },
    questions: [["What did they put in the bowl first?", ["two eggs", "milk", "honey"], 0, "sequencing"], ["What happened to the first pancake?", ["It landed on the floor.", "It burned.", "Dad ate it."], 0, "retrieval"], ["Who ate the first pancake?", ["Toffee the dog", "Dad", "the writer"], 0, "retrieval"], ["What did they eat their pancakes with?", ["honey and bananas", "cheese", "jam and cream"], 0, "retrieval"]],
    grammar: Object.assign({}, OSUF, { spots: ["cracked", "added", "mixed", "heated", "poured", "landed", "laughed", "waiting", "jumped", "cooked"], practice: [["jump + ed =", ["jumped", "jumpd", "jumping"], 0], ["cook + ing =", ["cooking", "cookking", "cooked"], 0], ["Which word tells us something has already happened?", ["cracked", "crack", "cracking"], 0]] }) },
  { id: "o7-frogs", band: 7, title: "From Tadpole to Frog", type: "Information", text: ["Frogs live near ponds, rivers and wet places. A frog starts its life as a tiny egg in a clump of frogspawn.", "Out of each egg comes a tadpole. The tadpole has a tail and lives in the water, eating plants. Slowly, it grows back legs, and then front legs. Its tail gets shorter and shorter.", "Soon it is a little frog, jumping out of the water! Frogs catch flies with their long, sticky tongues. In winter, some frogs rest at the bottom of the pond."],
    vocab: { frogspawn: "a clump of frog eggs in jelly", tadpole: "a baby frog with a tail" },
    questions: [["What is frogspawn?", ["a clump of frog eggs", "a kind of plant", "a baby fish"], 0, "vocabulary"], ["What comes out of each egg?", ["a tadpole", "a frog", "a fly"], 0, "retrieval"], ["Which legs grow first?", ["back legs", "front legs", "all of them together"], 0, "sequencing"], ["How do frogs catch flies?", ["with their long, sticky tongues", "with their tails", "in a net"], 0, "retrieval"]],
    grammar: Object.assign({}, OSUF, { spots: ["eating", "shorter", "jumping"], practice: [["jump + ing =", ["jumping", "jumpping", "jumped"], 0], ["short + er =", ["shorter", "shortest", "shortter"], 0], ["eat + ing =", ["eating", "eatting", "eated"], 0]] }) },
  { id: "o7-facts", band: 7, title: "Wow! Amazing Animal Facts", type: "Information", text: ["Did you know? A blue whale is the biggest animal that has ever lived! Its heart is as big as a small car!", "A cheetah can run as fast as a car on a busy road! A hummingbird flaps its wings so fast that they make a humming sound.", "A sloth moves so slowly that tiny green plants can grow on its fur! Can you guess which animal can sleep standing up? It is the horse!", "Which fact do you like best?"],
    vocab: { cheetah: "a big, spotty cat that runs very fast", sloth: "a very slow animal that lives in trees" },
    questions: [["What is the biggest animal that has ever lived?", ["the blue whale", "the cheetah", "the horse"], 0, "retrieval"], ["How big is a blue whale's heart?", ["as big as a small car", "as big as a house", "as big as a cup"], 0, "retrieval"], ["Which animal can sleep standing up?", ["the horse", "the sloth", "the whale"], 0, "retrieval"], ["Why can plants grow on a sloth's fur?", ["It moves so slowly.", "It lives in water.", "It eats plants."], 0, "inference"]],
    grammar: Object.assign({}, OPUNCT, { spots: ["Did you know?", "has ever lived!", "a small car!", "on a busy road!", "grow on its fur!", "Can you guess which animal can sleep standing up?", "It is the horse!", "Which fact do you like best?"], practice: punctPractice }) },
  { id: "o7-daynight", band: 7, title: "Day and Night", type: "Information", text: ["Every day, the Sun comes up in the morning and goes down in the evening. But the Sun is not really moving. It is the Earth that is turning!", "When our side of the Earth faces the Sun, it is light and we have day. When our side turns away from the Sun, it is dark and we have night.", "In summer, the days are longer and the nights are shorter. In winter, the days are shorter and the nights are longer. In the UAE, the longest day of the year is in June, and the shortest day is in December."],
    vocab: { faces: "points towards", turning: "going round and round" },
    questions: [["Is the Sun really moving across the sky?", ["No, the Earth is turning.", "Yes, it moves every day.", "Only in summer."], 0, "retrieval"], ["When do we have night?", ["when our side of the Earth turns away from the Sun", "when the Sun goes to sleep", "when it rains"], 0, "retrieval"], ["When are the days longer?", ["in summer", "in winter", "every day the same"], 0, "retrieval"], ["When is the shortest day in the UAE?", ["in December", "in June", "in March"], 0, "retrieval"]],
    grammar: Object.assign({}, OSUF, { spots: ["longer", "shorter", "longest", "shortest"], practice: [["long, longer, ___", ["longest", "longerest", "longist"], 0], ["Which word compares two things?", ["shorter", "shortest", "short"], 0], ["Which fits? \"The ___ day is in June.\"", ["longest", "longer", "long"], 0]] }) },
  { id: "o7-goldfish", band: 7, title: "How to Look After a Goldfish", type: "Instructions", text: ["Goldfish make great pets, but they need lots of care.", "1. Keep your goldfish in a big tank, not a small bowl.", "2. Feed it a pinch of fish food once or twice a day. Too much food is unhealthy!", "3. Clean the tank every week. Dirty water can make your fish unwell.", "4. Never tap on the glass. It can make your fish unhappy and scared.", "If you are unsure what to do, ask an adult to help you. A happy goldfish can live for over ten years!"],
    vocab: { pinch: "a very small amount held between finger and thumb", tank: "a glass box filled with water for fish" },
    questions: [["Where should you keep a goldfish?", ["in a big tank", "in a small bowl", "in the bath"], 0, "retrieval"], ["How often should you feed a goldfish?", ["once or twice a day", "once a week", "ten times a day"], 0, "retrieval"], ["Why should you never tap on the glass?", ["It can make your fish unhappy and scared.", "The glass is hot.", "The fish will jump out."], 0, "retrieval"], ["How long can a happy goldfish live?", ["over ten years", "one week", "one year"], 0, "retrieval"]],
    grammar: Object.assign({}, OUN, { spots: ["unhealthy", "unwell", "unhappy", "unsure"], practice: [["What does \"unwell\" mean?", ["not well", "very well", "well again"], 0], ["Which word means \"not sure\"?", ["unsure", "sure", "surely"], 0], ["Add un- to \"safe\".", ["unsafe", "safeun", "resafe"], 0]] }) },
  { id: "o7-questions", band: 7, title: "So Many Questions", type: "Poem", text: ["Why is the sky so very blue?", "Why do the cows all say moo?", "Where does the sun go late at night?", "How do the stars shine so bright?", "Who gave the zebra all its stripes?", "Why are bananas green, then ripe?", "So many questions in my head!", "Now it is time to go to bed!"],
    vocab: { ripe: "ready to eat", stripes: "long lines of colour" },
    questions: [["What colour is the sky in the poem?", ["blue", "grey", "pink"], 0, "retrieval"], ["Which animal has stripes?", ["the zebra", "the cow", "the cat"], 0, "retrieval"], ["What is the child's head full of?", ["questions", "songs", "dreams"], 0, "retrieval"], ["Why do the last two lines end with exclamation marks?", ["to show strong feeling", "because they are questions", "because they are lists"], 0, "structure"]],
    grammar: Object.assign({}, OPUNCT, { spots: ["Why is the sky so very blue?", "Where does the sun go late at night?", "How do the stars shine so bright?", "So many questions in my head!", "Now it is time to go to bed!"], practice: punctPractice }) },
  { id: "o7-kangaroo", band: 7, title: "The Jumping Kangaroo", type: "Poem", text: ["Jumping, bumping kangaroo,", "Leaping all the long day through,", "Munching grass and sleeping late,", "Resting by the garden gate.", "Baby in her pocket deep,", "Peeping out, then fast asleep.", "Jumping, bumping, off she goes,", "Where she's going, no one knows!"],
    vocab: { munching: "eating with big bites", peeping: "looking out quickly" },
    questions: [["What does the kangaroo eat?", ["grass", "fish", "bread"], 0, "retrieval"], ["Where is the baby?", ["in her pocket", "on her back", "in a tree"], 0, "retrieval"], ["Where does the kangaroo rest?", ["by the garden gate", "in a cave", "on the beach"], 0, "retrieval"], ["Which word rhymes with \"goes\"?", ["knows", "deep", "late"], 0, "language"]],
    grammar: Object.assign({}, OSUF, { spots: ["Jumping", "bumping", "Leaping", "Munching", "sleeping", "Resting", "Peeping"], practice: [["jump + ing =", ["jumping", "jumpping", "jumped"], 0], ["rest + ing =", ["resting", "restting", "rested"], 0], ["Which word tells us something is happening now?", ["munching", "munched", "munch"], 0]] }) }
];


TEST_A[7] = ORANGE_A; TEST_B[7] = ORANGE_B; TEXTS.push(...ORANGE_TEXTS);

/* =================== TURQUOISE BAND: full set =================== */
/* TURQUOISE BAND (8) · Year 2 · reading age 6y6m–7y · RWI Yellow
   Grammar: statements, questions, exclamations and commands; expanded noun phrases; commas in lists */
const TURQUOISE_A = [
  ["The puppy was frightened of the ___ thunder.", ["loud", "sweet", "flat", "thin"], 0], ["Grandad wears glasses to help him ___ the newspaper.", ["read", "carry", "paint", "bake"], 0],
  ["We planted seeds and waited for them to ___.", ["grow", "melt", "shout", "fold"], 0], ["The explorer used a map so she would not get ___.", ["lost", "tall", "sweet", "clean"], 0],
  ["The tiger has orange fur with black ___.", ["stripes", "strips", "straps", "strings"], 0], ["Please ___ the door quietly.", ["close", "clothes", "cloud", "claws"], 0],
  ["The farmer grows wheat in his ___.", ["field", "filled", "feel", "feet"], 0], ["We built a ___ out of snow.", ["snowman", "snowing", "snowed", "snowy"], 0],
  ["The baby ___ when she saw her bottle.", ["smiled", "smelled", "smashed", "snapped"], 0], ["The old house was dark and ___.", ["spooky", "spoon", "spotty", "sporty"], 0],
  ["My grandma lives in a little ___ by the sea.", ["cottage", "carriage", "cabbage", "college"], 0], ["The squirrel hid its ___ under a tree.", ["nuts", "nets", "notes", "nails"], 0],
  ["I ___ my teeth every morning and night.", ["brush", "blush", "crush", "bush"], 0], ["We need ___ to make a cake.", ["flour", "flower", "floor", "flown"], 0],
  ["The ___ flew high above the trees.", ["eagle", "eager", "easel", "eagerly"], 0], ["Lucy fell over and ___ her knee.", ["hurt", "hurl", "hunt", "hut"], 0],
  ["The park was full of old stone ___.", ["statues", "stations", "stables", "staples"], 0], ["Hold the glass carefully, or it might ___.", ["break", "bake", "brake", "beak"], 0],
  ["The children ___ the answer to the teacher.", ["whispered", "whistled", "wished", "washed"], 0], ["There are seven days in a ___.", ["week", "weak", "wake", "walk"], 0],
  ["The man ___ a ladder to reach the roof.", ["climbed", "clapped", "clipped", "cleaned"], 0], ["The wind ___ the leaves off the trees.", ["blew", "blue", "flew", "glue"], 0],
  ["The ___ was full of books.", ["library", "liberty", "lollipop", "laundry"], 0], ["A spider has eight ___.", ["legs", "logs", "lags", "eggs"], 0],
  ["The cake smelled ___.", ["delicious", "dangerous", "difficult", "different"], 0], ["I ___ my lunch box at home, so Mum brought it to school.", ["forgot", "forgave", "fought", "found"], 0],
  ["The ___ crawled slowly across the leaf.", ["caterpillar", "carpenter", "calendar", "cauliflower"], 0], ["Dad ___ the car before we went on holiday.", ["washed", "wished", "watched", "wasted"], 0],
  ["We could see our ___ in the shiny mirror.", ["faces", "places", "laces", "races"], 0], ["The ___ of the story was a brave little mouse.", ["hero", "here", "hair", "hire"], 0]
];
const TURQUOISE_B = [
  { title: "The Brave Little Tugboat", text: ["Toot was a small red tugboat who worked in a busy harbour. The big ships laughed at him. \"You are too tiny to be useful!\" they said.", "One stormy night, a huge cargo ship got stuck on the rocks. The big ships were too large to get close. Toot chugged out bravely through the crashing waves. He tied his rope to the ship and pulled with all his might. Slowly, the giant ship slid free.", "In the morning, everyone cheered for Toot. \"Small can be mighty,\" said the harbour master."],
    q: [["What colour is Toot?", ["red", "blue", "green"], 0, "retrieval"], ["Why did the big ships laugh at Toot?", ["They thought he was too small to be useful.", "He was slow.", "He was noisy."], 0, "retrieval"], ["Why couldn't the big ships help the cargo ship?", ["They were too large to get close.", "They were asleep.", "They were scared of the dark."], 0, "retrieval"], ["\"He pulled with all his might\" means he pulled…", ["as hard as he could", "very gently", "for a short time"], 0, "vocabulary"], ["What is the message of the story?", ["Being small doesn't stop you being helpful.", "Big ships are best.", "Never go out in a storm."], 0, "summarising"]] },
  { title: "Sharks", text: ["Sharks have lived in the oceans for millions of years. There are more than 500 kinds of shark. The whale shark is the biggest fish in the world, but it only eats tiny creatures called plankton.", "Sharks do not have bones. Their skeletons are made of cartilage, which is the same bendy material as your ears and the end of your nose!", "Many sharks have rows of sharp teeth. When a tooth falls out, a new one moves forward to take its place. Most sharks are not dangerous to people. In fact, people are much more dangerous to sharks."],
    q: [["How many kinds of shark are there?", ["more than 500", "about 50", "only 5"], 0, "retrieval"], ["What does the whale shark eat?", ["tiny creatures called plankton", "other sharks", "boats"], 0, "retrieval"], ["What are sharks' skeletons made of?", ["cartilage", "bones", "shells"], 0, "retrieval"], ["What happens when a shark loses a tooth?", ["A new one moves forward to take its place.", "It can't eat any more.", "It grows a beak."], 0, "retrieval"], ["Why might people be more dangerous to sharks?", ["People catch and harm many sharks.", "Sharks are scared of swimmers.", "People have sharp teeth."], 0, "inference"]] },
  { title: "At the Market", text: ["Apples, oranges, lemons and limes,", "Bells and whistles and clocks that chime,", "Carpets, cushions, baskets and bowls,", "Spices in sacks and warm bread rolls.", "Sellers are shouting, \"Come and see!", "Two for the price of one for me!\"", "I fill my bag, I pay my way,", "What a busy market day!"],
    q: [["Which of these is in the poem?", ["lemons", "bananas", "pears"], 0, "retrieval"], ["What is kept in sacks?", ["spices", "carpets", "clocks"], 0, "retrieval"], ["What are the sellers shouting?", ["Come and see!", "Go away!", "We are closed!"], 0, "retrieval"], ["Which word is a sound the clocks make?", ["chime", "whistle", "shout"], 0, "language"], ["How does the poet feel about the market?", ["excited", "bored", "frightened"], 0, "inference"]] }
];
const TTYPES = { focus: "Four kinds of sentence", explain: "A statement tells you something. A question asks something and ends with ?. A command tells someone to do something. An exclamation shows strong feeling, often starts with What or How, and ends with !" };
const TENP = { focus: "Expanded noun phrases", explain: "A noun phrase is a group of words built around a noun. We can expand it with adjectives (a big, warm hug) or extra words (a lady with a green apron) to give the reader more detail." };
const TLIST = { focus: "Commas in lists", explain: "When we write a list in a sentence, we put a comma between the items. We use and (not a comma) before the last item: apples, pears, plums and grapes." };
const typesPractice = [["Which is a question?", ["Why is he so cross?", "Stop that noise!", "The giant sat down."], 0], ["Which is a command?", ["Wash your hands.", "What a lovely day!", "The cake is ready."], 0], ["Which is an exclamation?", ["What a wonderful blanket!", "Can I come too?", "Close the door."], 0]];
const enpPractice = [["Which is an expanded noun phrase?", ["a kind lady with a green apron", "a lady", "she smiled"], 0], ["Which makes \"the dog\" more interesting?", ["the fluffy little dog", "the dog ran", "the dogs"], 0], ["In \"a huge pile of red apples\", which word is the main noun?", ["pile", "huge", "red"], 0]];
const listPractice = [["Which list is punctuated correctly?", ["I bought apples, pears, plums and grapes.", "I bought apples pears plums and grapes.", "I bought apples, pears, plums, and, grapes."], 0], ["Which is correct?", ["We need cups, plates and spoons.", "We need, cups plates and spoons.", "We need cups plates, and spoons."], 0], ["What goes before the last item in a list?", ["and", "a comma", "a full stop"], 0]];
const TURQUOISE_TEXTS = [
  { id: "t8-giant", band: 8, title: "The Grumpy Giant", type: "Story", text: ["High on a hill lived a grumpy giant called Grumble. Every morning, he stomped down to the village and shouted, \"Be quiet! Stop that noise!\"", "The children were scared of him. \"Why is he always so cross?\" asked Nadia.", "One day, Nadia was brave. She climbed the hill and knocked on the giant's enormous door. \"Hello, Mr Grumble,\" she said. \"Can I ask you something?\" The giant looked surprised. \"What do you want?\" he grumbled.", "\"Why are you always so grumpy?\" asked Nadia. The giant sat down with a sigh. \"I can never sleep,\" he said. \"My bed is too small and my feet stick out!\"", "Nadia had an idea. The next day, the whole village sewed the biggest blanket ever made and carried it up the hill. That night, Grumble slept soundly for the first time in years. In the morning, he smiled. \"What a wonderful blanket!\" he said."],
    vocab: { grumbled: "spoke in a low, cross voice", soundly: "deeply and peacefully", enormous: "very, very big" },
    questions: [["Why were the children scared of Grumble?", ["He stomped and shouted at them.", "He was very tall.", "He ate their food."], 0, "retrieval"], ["Why was the giant always grumpy?", ["He could never sleep.", "He was hungry.", "He had no friends."], 0, "retrieval"], ["What did the village make for him?", ["the biggest blanket ever made", "a new house", "a big cake"], 0, "retrieval"], ["What does \"grumbled\" mean?", ["spoke in a low, cross voice", "sang loudly", "laughed"], 0, "vocabulary"], ["How did Grumble feel at the end?", ["happy", "cross", "tired"], 0, "inference"]],
    grammar: Object.assign({}, TTYPES, { spots: ["Be quiet! Stop that noise!", "Why is he always so cross?", "Can I ask you something?", "The giant sat down with a sigh.", "What a wonderful blanket!"], practice: typesPractice }) },
  { id: "t8-supermarket", band: 8, title: "Lost in the Supermarket", type: "Story", text: ["Omar was helping Mum with the big weekly shop. The busy supermarket was full of tall shelves, shiny trolleys and noisy people.", "Omar stopped to look at a huge pile of red apples. When he turned around, Mum had gone!", "His heart started thumping. He walked past the long freezer full of icy treats. He walked past the warm bakery with its sweet smell of fresh bread. But he could not see Mum anywhere.", "Then he remembered what Mum always said: \"If you get lost, find a person with a name badge.\" Omar walked up to a kind lady with a green apron and a shiny name badge. \"I've lost my mum,\" he said. The lady smiled and made an announcement.", "A few moments later, Mum came rushing round the corner with the wobbly trolley. \"You did exactly the right thing,\" she said, giving him a big, warm hug."],
    vocab: { thumping: "beating hard and fast", announcement: "a message read out for everyone to hear", badge: "a small sign you pin on your clothes" },
    questions: [["What was Omar looking at when he lost Mum?", ["a huge pile of red apples", "the freezer", "the bakery"], 0, "retrieval"], ["What did Mum always tell Omar to do if he got lost?", ["find a person with a name badge", "stay by the door", "shout very loudly"], 0, "retrieval"], ["What does \"announcement\" mean?", ["a message read out for everyone to hear", "a shopping list", "a kind of trolley"], 0, "vocabulary"], ["How did Omar feel when he couldn't find Mum?", ["worried", "happy", "bored"], 0, "inference"], ["How did Mum feel about what Omar did?", ["proud of him", "cross with him", "surprised he got lost"], 0, "inference"]],
    grammar: Object.assign({}, TENP, { spots: ["The busy supermarket", "tall shelves", "shiny trolleys", "noisy people", "a huge pile of red apples", "the long freezer full of icy treats", "the warm bakery", "a kind lady with a green apron", "a big, warm hug"], practice: enpPractice }) },
  { id: "t8-birthday", band: 8, title: "The Birthday Surprise", type: "Story", text: ["It was Dad's birthday, and Hana and Yusuf wanted to make it special.", "While Dad was at work, they made a list. They needed balloons, streamers, candles and a cake. Mum helped them bake a chocolate cake. They mixed flour, sugar, eggs and butter in a big bowl. Then they decorated the top with strawberries, chocolate buttons and sprinkles.", "Next, they blew up red, blue, yellow and green balloons. Yusuf hung streamers over the door, the window and the lamp. Hana made a card with a glittery star on the front.", "At six o'clock, they heard the key in the door. They turned off the lights and hid behind the sofa. When Dad walked in, they jumped up and shouted, \"SURPRISE!\"", "Dad laughed so much that he had to sit down. \"This is the best birthday ever,\" he said, \"and I didn't even guess!\""],
    vocab: { streamers: "long strips of coloured paper used to decorate", decorated: "made something look pretty", glittery: "sparkly" },
    questions: [["Whose birthday was it?", ["Dad's", "Hana's", "Mum's"], 0, "retrieval"], ["What kind of cake did they bake?", ["chocolate", "lemon", "strawberry"], 0, "retrieval"], ["Where did they hide?", ["behind the sofa", "under the table", "in the garden"], 0, "retrieval"], ["What did they do just before Dad came in?", ["turned off the lights and hid", "ate the cake", "went to bed"], 0, "sequencing"], ["Did Dad know about the surprise?", ["No, he didn't guess.", "Yes, he knew all along.", "Mum told him."], 0, "inference"]],
    grammar: Object.assign({}, TLIST, { spots: ["balloons, streamers, candles and a cake", "flour, sugar, eggs and butter", "strawberries, chocolate buttons and sprinkles", "red, blue, yellow and green balloons", "the door, the window and the lamp"], practice: listPractice }) },
  { id: "t8-paintbrush", band: 8, title: "The Magic Paintbrush", type: "Story", text: ["In a small village at the edge of a dark forest lived a girl called Lin who loved to paint. She had no brushes, so she painted with a twig in the soft, wet sand.", "One evening, an old woman with silver hair and a twinkling smile gave Lin a wooden paintbrush. \"Paint only to help others,\" she said.", "The next day, Lin painted a fat, juicy fish for a hungry fisherman. To her amazement, the fish flapped off the paper and into his basket! She painted a strong wooden bridge over the wide river, and the villagers walked across it.", "Soon, a greedy king heard about the magic brush. \"Paint me a mountain of gold!\" he ordered. Lin painted a sea, with a tall golden mountain far away on an island. The king jumped into his ship to sail there, but Lin painted a big, roaring wave, and the ship drifted far, far away.", "Lin went home and kept painting, but only to help others."],
    vocab: { amazement: "great surprise", greedy: "wanting more than you need", drifted: "was carried along slowly by the water" },
    questions: [["What did Lin paint with at first?", ["a twig in the sand", "her fingers", "a pencil"], 0, "retrieval"], ["What did the old woman tell Lin?", ["Paint only to help others.", "Paint the king a mountain.", "Never paint again."], 0, "retrieval"], ["What happened to the fish Lin painted?", ["It came to life and flapped into the basket.", "It washed away.", "The king ate it."], 0, "retrieval"], ["Why did Lin not paint gold for the king?", ["He was greedy, and she only painted to help others.", "She had no gold paint.", "She was too tired."], 0, "inference"], ["What happened to the king?", ["His ship drifted far away.", "He became rich.", "He learned to paint."], 0, "retrieval"]],
    grammar: Object.assign({}, TENP, { spots: ["a small village at the edge of a dark forest", "the soft, wet sand", "an old woman with silver hair and a twinkling smile", "a fat, juicy fish", "a strong wooden bridge over the wide river", "a greedy king", "a tall golden mountain", "a big, roaring wave"], practice: enpPractice }) },
  { id: "t8-owls", band: 8, title: "Owls", type: "Information", text: ["Owls are amazing hunters of the night. They have large, round eyes that help them to see in the dark. An owl cannot move its eyes, so it turns its whole head instead. Some owls can turn their heads almost all the way round!", "Owls have soft, fluffy feathers on the edges of their wings. These special feathers help them to fly silently, so the small animals they hunt cannot hear them coming.", "Owls have excellent hearing too. A barn owl can hear a tiny mouse moving under thick snow. When it hears something, it swoops down and catches it with its sharp, curved claws.", "After eating, an owl coughs up a small, hard pellet. Inside the pellet are the bones and fur it could not digest. Scientists study owl pellets to find out what owls eat."],
    vocab: { silently: "without making any sound", swoops: "flies down quickly", digest: "break food down inside the body" },
    questions: [["Why does an owl turn its whole head?", ["It cannot move its eyes.", "It is dizzy.", "It is looking for its nest."], 0, "retrieval"], ["What helps owls fly silently?", ["soft, fluffy feathers on the edges of their wings", "their large eyes", "their sharp claws"], 0, "retrieval"], ["What can a barn owl hear?", ["a tiny mouse moving under thick snow", "the wind", "other owls far away"], 0, "retrieval"], ["What is inside an owl pellet?", ["bones and fur the owl could not digest", "eggs", "feathers"], 0, "retrieval"], ["Why do scientists study owl pellets?", ["to find out what owls eat", "to make nests", "to count owls"], 0, "retrieval"]],
    grammar: Object.assign({}, TENP, { spots: ["large, round eyes", "soft, fluffy feathers on the edges of their wings", "These special feathers", "a tiny mouse moving under thick snow", "sharp, curved claws", "a small, hard pellet"], practice: enpPractice }) },
  { id: "t8-fruitsalad", band: 8, title: "How to Make Fruit Salad", type: "Instructions", text: ["Do you want a healthy snack? Try this colourful fruit salad!", "You will need: a banana, an apple, a handful of grapes, an orange, a bowl, a knife and a chopping board.", "1. Wash your hands.", "2. Ask an adult to help you with the knife.", "3. Peel the banana and cut it into slices.", "4. Cut the apple into small pieces.", "5. Peel the orange and break it into segments.", "6. Put all the fruit in the bowl and stir gently.", "Now taste it. How delicious it is! You could add a spoonful of yoghurt on top. Which fruit will you try next time?"],
    vocab: { segments: "the natural pieces inside an orange", gently: "softly and carefully" },
    questions: [["What should you do first?", ["Wash your hands.", "Peel the banana.", "Stir the fruit."], 0, "sequencing"], ["Who should help you with the knife?", ["an adult", "a friend", "nobody"], 0, "retrieval"], ["What do you do with the orange?", ["peel it and break it into segments", "cut it into slices", "squeeze it"], 0, "retrieval"], ["What could you add on top?", ["a spoonful of yoghurt", "sugar", "chocolate"], 0, "retrieval"], ["Why should an adult help with the knife?", ["Knives are sharp and can be dangerous.", "Adults like fruit.", "The knife is heavy."], 0, "inference"]],
    grammar: Object.assign({}, TTYPES, { spots: ["Do you want a healthy snack?", "Wash your hands.", "Peel the banana and cut it into slices.", "How delicious it is!", "Which fruit will you try next time?"],
      practice: [["Which is a command?", ["Wash your hands.", "Do you want a snack?", "How delicious it is!"], 0], ["Instructions are usually written as…", ["commands", "questions", "exclamations"], 0], ["Which is an exclamation?", ["How delicious it is!", "Peel the banana.", "Is it ready?"], 0]] }) },
  { id: "t8-desertcamp", band: 8, title: "Packing for a Desert Camp", type: "Information", text: ["Camping in the desert is exciting, but you need to be ready. The days can be hot, and the nights can be surprisingly cold.", "For the daytime, pack a sun hat, sunglasses, sun cream and a big bottle of water. Light, long-sleeved clothes will protect your arms from the sun.", "For the night, pack a warm jumper, thick socks, a woolly hat and a sleeping bag. You will also need a torch, spare batteries and a little first-aid kit.", "Don't forget food! Dates, nuts, crackers and fruit are easy to carry and give you lots of energy.", "At night, there are no city lights, so you can see thousands of stars. You might even spot a shooting star, a planet or the Milky Way. Remember to take a notebook, a pencil and your curiosity!"],
    vocab: { surprisingly: "in a way you don't expect", "first-aid": "help given to someone who is hurt or ill", curiosity: "wanting to find out about things" },
    questions: [["Why should you pack a warm jumper?", ["The nights can be cold.", "The days are cold.", "It might snow."], 0, "retrieval"], ["What protects your arms from the sun?", ["light, long-sleeved clothes", "a woolly hat", "a torch"], 0, "retrieval"], ["Why are dates and nuts good to take?", ["They are easy to carry and give you energy.", "They are cold.", "They help you sleep."], 0, "retrieval"], ["Why can you see thousands of stars in the desert?", ["There are no city lights.", "The desert is closer to space.", "The stars are bigger there."], 0, "inference"], ["What does \"surprisingly\" mean?", ["in a way you don't expect", "very quickly", "in a scary way"], 0, "vocabulary"]],
    grammar: Object.assign({}, TLIST, { spots: ["a sun hat, sunglasses, sun cream and a big bottle of water", "a warm jumper, thick socks, a woolly hat and a sleeping bag", "a torch, spare batteries and a little first-aid kit", "Dates, nuts, crackers and fruit", "a shooting star, a planet or the Milky Way", "a notebook, a pencil and your curiosity"], practice: listPractice }) },
  { id: "t8-teeth", band: 8, title: "Look After Your Teeth!", type: "Information", text: ["Did you know that you have twenty baby teeth? Soon they will start to fall out, and bigger adult teeth will grow in their place. You only get one set of adult teeth, so look after them!", "Brush your teeth twice a day, in the morning and before bed. Use a small blob of toothpaste and brush for two minutes. Don't forget the backs of your teeth!", "Sugary foods and fizzy drinks can make holes in your teeth. These holes are called cavities. Try to eat sweets only as a treat, and drink plenty of water.", "Visit the dentist every six months. The dentist will check your teeth and help keep them healthy.", "What a difference a good smile makes! How will you look after your teeth today?"],
    vocab: { cavities: "holes in your teeth", plenty: "a lot, as much as you need" },
    questions: [["How many baby teeth do you have?", ["twenty", "ten", "thirty-two"], 0, "retrieval"], ["How long should you brush for?", ["two minutes", "ten seconds", "half an hour"], 0, "retrieval"], ["What are cavities?", ["holes in your teeth", "baby teeth", "toothbrushes"], 0, "vocabulary"], ["How often should you visit the dentist?", ["every six months", "every day", "once in your life"], 0, "retrieval"], ["Why is it important to look after your adult teeth?", ["You only get one set.", "They are smaller.", "They fall out every year."], 0, "inference"]],
    grammar: Object.assign({}, TTYPES, { spots: ["Did you know that you have twenty baby teeth?", "Brush your teeth twice a day, in the morning and before bed.", "Don't forget the backs of your teeth!", "What a difference a good smile makes!", "How will you look after your teeth today?"], practice: typesPractice }) },
  { id: "t8-lunchbox", band: 8, title: "In My Lunch Box", type: "Poem", text: ["In my lunch box, what will I find?", "A sandwich, a yoghurt, a grape (just one kind),", "Some carrots, some crackers, a cookie or two,", "A banana, a napkin, a note: \"I love you!\"", "Should I swap my carrots, my crackers, my cheese", "For Mia's mango and Ahmed's peas?", "No! I'll eat them all, every crumb, every bite,", "Then race to the playground with all of my might!"],
    vocab: { napkin: "a piece of paper or cloth to wipe your hands and mouth", might: "strength" },
    questions: [["What does the note in the lunch box say?", ["I love you!", "Eat your carrots!", "Have a good day!"], 0, "retrieval"], ["What does the child think about swapping?", ["carrots, crackers and cheese", "the sandwich", "the note"], 0, "retrieval"], ["What does the child decide to do?", ["eat everything", "swap everything", "share with Mia"], 0, "retrieval"], ["Where does the child race to?", ["the playground", "the classroom", "home"], 0, "retrieval"], ["\"With all of my might\" means…", ["as fast and hard as I can", "very slowly", "with my friends"], 0, "vocabulary"]],
    grammar: Object.assign({}, TLIST, { spots: ["A sandwich, a yoghurt, a grape", "Some carrots, some crackers, a cookie or two", "A banana, a napkin, a note", "my carrots, my crackers, my cheese", "every crumb, every bite"], practice: listPractice }) },
  { id: "t8-oaktree", band: 8, title: "The Old Oak Tree", type: "Poem", text: ["The old oak tree with its wrinkly bark", "Stands at the end of the quiet park.", "Its long, twisty branches reach for the sky,", "Where fluffy white clouds go drifting by.", "A busy brown squirrel runs up and down,", "A shy little robin hops round and round,", "And under its roots, in a cosy dark hole,", "Sleeps a sleepy, velvety, soft little mole."],
    vocab: { bark: "the hard outside of a tree trunk", velvety: "soft and smooth, like velvet", drifting: "moving along slowly" },
    questions: [["Where does the old oak tree stand?", ["at the end of the quiet park", "in the middle of a town", "by the sea"], 0, "retrieval"], ["What runs up and down the tree?", ["a busy brown squirrel", "a mole", "a robin"], 0, "retrieval"], ["Where does the mole sleep?", ["in a hole under the roots", "on a branch", "in a nest"], 0, "retrieval"], ["What reaches for the sky?", ["the branches", "the roots", "the clouds"], 0, "retrieval"], ["What does \"drifting\" mean?", ["moving along slowly", "falling fast", "staying still"], 0, "vocabulary"]],
    grammar: Object.assign({}, TENP, { spots: ["The old oak tree with its wrinkly bark", "the quiet park", "long, twisty branches", "fluffy white clouds", "A busy brown squirrel", "A shy little robin", "a cosy dark hole", "a sleepy, velvety, soft little mole"], practice: enpPractice }) }
];
TEST_A[8] = TURQUOISE_A; TEST_B[8] = TURQUOISE_B; TEXTS.push(...TURQUOISE_TEXTS);

/* =================== GOLD BAND: full set =================== */
/* GOLD BAND (10) · Year 2 · reading age 7y3m–7y6m · RWI Grey
   Grammar: subordination (when, if, that, because); apostrophes for contraction and singular possession; suffixes -ness, -ful, -less, -ly */
const GOLD_A = [
  ["The detective examined the footprints to find a ___.", ["clue", "glue", "blue", "true"], 0], ["After the long race, the runners were thirsty and ___.", ["exhausted", "exploded", "explained", "expensive"], 0],
  ["Penguins cannot fly, but they are excellent ___.", ["swimmers", "drivers", "writers", "painters"], 0], ["The audience gasped when the magician made the rabbit ___.", ["disappear", "disagree", "disappoint", "discover"], 0],
  ["The girl helped the old man because she was very ___.", ["thoughtful", "thoughtless", "careless", "harmless"], 0], ["The puppy wagged its tail ___.", ["happily", "happiness", "happy", "happier"], 0],
  ["We stayed indoors ___ it was raining.", ["because", "unless", "until", "although"], 0], ["The empty room was dark and ___.", ["silent", "sailing", "salty", "simple"], 0],
  ["The ___ hooted in the dark woods.", ["owl", "oil", "ill", "all"], 0], ["The children were ___ when the snow began to fall.", ["delighted", "deleted", "delayed", "delivered"], 0],
  ["The pirate ship ___ across the ocean.", ["sailed", "sealed", "soiled", "salted"], 0], ["Don't forget your coat ___ it is cold outside.", ["because", "until", "unless", "after"], 0],
  ["The brave knight was ___ and strong.", ["fearless", "helpless", "useless", "hopeless"], 0], ["We could see the ___ of the mountain from the window.", ["peak", "peck", "pick", "pack"], 0],
  ["The baker sold ___ bread every morning.", ["fresh", "flesh", "fetch", "flash"], 0], ["My friend is very ___; she always tells the truth.", ["honest", "hottest", "hardest", "hollow"], 0],
  ["The ___ marched through the town playing drums.", ["band", "bend", "bond", "bind"], 0], ["It's ___ to wear a seatbelt in the car.", ["important", "impossible", "imaginary", "impatient"], 0],
  ["A ___ rainbow appeared after the storm.", ["colourful", "colourless", "careful", "painful"], 0], ["That is ___ coat on the peg.", ["Sami's", "Samis", "Samis'", "Sami's's"], 0],
  ["The magician ___ a rabbit out of his hat.", ["pulled", "pooled", "pulped", "polled"], 0], ["The ___ boy shared his sweets with everyone.", ["generous", "dangerous", "jealous", "greedy"], 0],
  ["The kitten was ___ after its long nap.", ["playful", "plateful", "pitiful", "plentiful"], 0], ["We waited ___ for the bus.", ["patiently", "patience", "patient", "patients"], 0],
  ["If you ___ hard, you will get better.", ["try", "tray", "tie", "toy"], 0], ["The fox crept ___ towards the hens.", ["silently", "silence", "silent", "silents"], 0],
  ["I ___ go to the park if it stops raining.", ["will", "well", "wall", "wool"], 0], ["The ___ of the castle were made of stone.", ["walls", "wells", "wills", "whales"], 0],
  ["Grandpa told a ___ story that made us all laugh.", ["funny", "fuzzy", "furry", "fussy"], 0], ["The thirsty plants ___ taller after the rain.", ["grew", "grow", "growing", "grown"], 0]
];
const GOLD_B = [
  { title: "The Fox and the Crow", text: ["One sunny morning, a crow found a piece of cheese. She flew up into a tall tree and sat on a branch to eat it.", "A hungry fox was passing by. When he saw the cheese, his mouth began to water. \"Good morning, beautiful bird,\" he called. \"Your feathers are so shiny! I'm sure your voice is lovely too. Won't you sing a song for me?\"", "The crow felt very proud. She opened her beak to sing, and the cheese fell straight down into the fox's waiting mouth.", "\"Thank you,\" said the fox, licking his lips. \"Next time, don't believe everyone who says nice things to you!\""],
    q: [["Where did the crow sit to eat the cheese?", ["on a branch of a tall tree", "on the ground", "on the fox's back"], 0, "retrieval"], ["Why did the fox say nice things to the crow?", ["He wanted her cheese.", "He wanted to be her friend.", "He liked her singing."], 0, "inference"], ["What happened when the crow opened her beak?", ["The cheese fell into the fox's mouth.", "She sang a beautiful song.", "The fox ran away."], 0, "sequencing"], ["\"His mouth began to water\" means the fox was…", ["hungry", "thirsty", "crying"], 0, "vocabulary"], ["What is the lesson of the story?", ["Don't trust people who flatter you to get something.", "Always share your food.", "Foxes are kind."], 0, "summarising"]] },
  { title: "Rainforests", text: ["Rainforests are thick, green forests where it rains almost every day. They grow in hot places near the middle of the Earth.", "More than half of all the world's plants and animals live in rainforests. Monkeys swing through the treetops, colourful parrots squawk in the branches, and huge snakes slide across the forest floor.", "Rainforests are useful to everyone. Many foods, such as bananas, chocolate and coffee, first came from rainforest plants. Some medicines are made from rainforest plants too.", "Sadly, rainforests are being cut down to make space for farms and roads. When the trees are lost, the animals lose their homes. That's why many people are working hard to protect them."],
    q: [["Where do rainforests grow?", ["in hot places near the middle of the Earth", "near the North Pole", "on mountains only"], 0, "retrieval"], ["Which food first came from rainforest plants?", ["chocolate", "cheese", "bread"], 0, "retrieval"], ["Why are rainforests being cut down?", ["to make space for farms and roads", "because they are too wet", "to stop the rain"], 0, "retrieval"], ["What happens to animals when the trees are lost?", ["They lose their homes.", "They get bigger.", "They move to the sea."], 0, "inference"], ["What is the main idea of the last paragraph?", ["Rainforests are in danger and need protecting.", "Rainforests are wet.", "Monkeys live in trees."], 0, "summarising"]] },
  { title: "My Kite", text: ["My kite is red and yellow,", "My kite is long and thin,", "And when the wind is blowing,", "It makes a happy grin.", "It dances on the breezes,", "It tumbles, twists and rolls,", "Because it wants to touch the clouds", "And play with all the gulls.", "But when the wind is sleeping,", "My kite comes floating down,", "And lies upon the grassy hill", "Just like a sleepy clown."],
    q: [["What colours is the kite?", ["red and yellow", "blue and green", "black and white"], 0, "retrieval"], ["When does the kite fly up?", ["when the wind is blowing", "when it is raining", "at night"], 0, "retrieval"], ["Why does the kite want to go up high?", ["to touch the clouds and play with the gulls", "to get away from the child", "to find the sun"], 0, "retrieval"], ["\"When the wind is sleeping\" means…", ["when there is no wind", "when it is night", "when the wind is tired"], 0, "language"], ["What does the kite look like on the hill?", ["a sleepy clown", "a red bird", "a long snake"], 0, "retrieval"]] }
];
const GSUB = { focus: "Joining with when, if, that and because", explain: "When, if, that and because join two ideas, where one part depends on the other: I wore my coat because it was cold. If it rains, we will stay inside." };
const GAPOS = { focus: "Apostrophes", explain: "An apostrophe can show that letters are missing (do not → don't, I am → I'm). It can also show that something belongs to someone: Sara's puppy (the puppy belonging to Sara)." };
const GSUF = { focus: "Suffixes -ness, -ful, -less and -ly", explain: "Suffixes change a word: kind → kindness, help → helpful, care → careless, quick → quickly. -ful means full of, -less means without, -ly tells us how something is done." };
const subPractice = [["Which word fits? \"I wore my coat ___ it was cold.\"", ["because", "but", "or"], 0], ["Which word fits? \"___ it rains, we will stay inside.\"", ["If", "And", "But"], 0], ["Which word fits? \"The bell rang ___ it was home time.\"", ["when", "or", "so"], 0]];
const aposPractice = [["What is the short form of \"do not\"?", ["don't", "dont", "do'nt"], 0], ["Which means \"the bone belonging to the dog\"?", ["the dog's bone", "the dogs bone", "the dogs' bones"], 0], ["Which is correct?", ["I'm going home.", "Im going home.", "I'am going home."], 0]];
const sufPractice = [["kind + ness =", ["kindness", "kindniss", "kindless"], 0], ["Which word means \"without care\"?", ["careless", "careful", "carefully"], 0], ["Which word tells us how something was done?", ["quietly", "quiet", "quietness"], 0]];
const GOLD_TEXTS = [
  { id: "g10-puppy", band: 10, title: "Sara's Lost Puppy", type: "Story", text: ["Sara's puppy, Biscuit, was missing. \"He's not in the garden,\" said Sara, \"and he's not in his basket!\"", "Sara and her brother Tariq searched everywhere. They looked in Dad's shed and under Mum's car. They even looked in Grandma's flowerbed next door. \"Biscuit isn't anywhere!\" cried Sara.", "Then they heard barking. It was coming from the bakery at the end of the road. Mr Ali, the baker, was standing at the door, laughing. \"I think this belongs to you,\" he said. In his arms was a very floury puppy!", "\"He must've smelled the bread,\" said Tariq. \"He's covered in flour!\"", "Sara gave Biscuit a big hug. \"Don't ever run away again,\" she said. Mr Ali smiled and gave them a warm roll to share. \"That's the friendliest puppy I've ever met,\" he said."],
    vocab: { floury: "covered in flour", belongs: "is owned by someone" },
    questions: [["What is the puppy's name?", ["Biscuit", "Tariq", "Mr Ali"], 0, "retrieval"], ["Where did they look first?", ["in the garden and the basket", "at the bakery", "in Grandma's flowerbed"], 0, "sequencing"], ["Where was the puppy?", ["at the bakery", "in Dad's shed", "under Mum's car"], 0, "retrieval"], ["Why was Biscuit covered in flour?", ["He went into the bakery because he smelled the bread.", "Sara threw flour at him.", "He rolled in the garden."], 0, "inference"], ["How did Mr Ali feel about Biscuit?", ["He thought he was friendly and funny.", "He was cross with him.", "He wanted to keep him."], 0, "inference"]],
    grammar: Object.assign({}, GAPOS, { spots: ["Sara's puppy", "He's", "he's", "Dad's shed", "Mum's car", "Grandma's flowerbed", "isn't", "must've", "Don't", "That's", "I've"], practice: aposPractice }) },
  { id: "g10-late", band: 10, title: "Late Again, Leo!", type: "Story", text: ["Leo was always late. He was late for breakfast because he couldn't find his socks. He was late for school because he stopped to look at every snail on the path.", "\"If you're late for the class trip tomorrow,\" said his teacher, Mrs Ahmed, \"the bus will leave without you.\"", "That night, Leo made a plan. He put his clothes on his chair so that he could find them quickly. He set his alarm clock because he didn't want to oversleep. He even packed his bag before he went to bed.", "When the alarm rang, Leo jumped out of bed. He got dressed, ate his breakfast and walked straight to school. He didn't stop for a single snail!", "When Leo arrived, the bus wasn't there. He was the very first one! Mrs Ahmed couldn't believe her eyes. \"Leo,\" she said, \"you're early!\"", "Leo grinned. \"I know that a plan can help,\" he said, \"if you stick to it.\""],
    vocab: { oversleep: "sleep for longer than you meant to", grinned: "gave a big smile" },
    questions: [["Why was Leo late for breakfast?", ["He couldn't find his socks.", "He was watching snails.", "He was asleep."], 0, "retrieval"], ["What would happen if Leo was late for the trip?", ["The bus would leave without him.", "He would get a sticker.", "Mrs Ahmed would wait."], 0, "retrieval"], ["Why did Leo set his alarm clock?", ["He didn't want to oversleep.", "He wanted to look at snails.", "His mum told him to."], 0, "retrieval"], ["How did Mrs Ahmed feel when Leo arrived?", ["very surprised", "angry", "sad"], 0, "inference"], ["What did Leo learn?", ["A plan helps if you stick to it.", "Snails are slow.", "Buses always leave early."], 0, "summarising"]],
    grammar: Object.assign({}, GSUB, { spots: ["because he couldn't find his socks", "because he stopped to look at every snail on the path", "If you're late for the class trip tomorrow", "so that he could find them quickly", "because he didn't want to oversleep", "When the alarm rang", "When Leo arrived", "that a plan can help", "if you stick to it"], practice: subPractice }) },
  { id: "g10-kindness", band: 10, title: "The Kindness Club", type: "Story", text: ["Amira noticed that the playground was not a very happy place. Some children played roughly, some were careless with their words, and some sat alone, looking hopeless.", "\"We should start a Kindness Club,\" Amira told her friends. \"Every day, each of us will do one helpful thing.\"", "On Monday, Jack quietly gave his spare pencil to a girl who had forgotten hers. On Tuesday, Priya patiently helped a younger boy tie his laces. On Wednesday, Amira invited a lonely new boy called Felix to join their game. He smiled for the first time all week.", "Soon, other children wanted to join. The club grew bigger and bigger. Children were more careful and more thoughtful. Even the teachers noticed the difference.", "At the end of term, the head teacher gave the Kindness Club a special award. \"Your kindness has made our school a brighter, friendlier place,\" she said. Amira felt so proud. \"Kindness is like a seed,\" she said. \"Once you plant it, it keeps on growing.\""],
    vocab: { roughly: "in a rough, not gentle, way", lonely: "sad because you are on your own", award: "a prize for doing something well" },
    questions: [["Why did Amira start the Kindness Club?", ["The playground was not a very happy place.", "Her teacher told her to.", "She wanted a prize."], 0, "retrieval"], ["What did Jack do on Monday?", ["gave a spare pencil to a girl", "helped tie laces", "invited Felix to play"], 0, "retrieval"], ["How did Felix feel when he was invited to play?", ["happy", "cross", "embarrassed"], 0, "inference"], ["What did the head teacher give the club?", ["a special award", "a party", "a new playground"], 0, "retrieval"], ["\"Kindness is like a seed\" means…", ["kindness spreads and grows once you start", "kindness is small", "kindness grows in gardens"], 0, "language"]],
    grammar: Object.assign({}, GSUF, { spots: ["roughly", "careless", "hopeless", "helpful", "quietly", "patiently", "careful", "thoughtful", "kindness", "Kindness"], practice: sufPractice }) },
  { id: "g10-sandstorm", band: 10, title: "The Sandstorm", type: "Story", text: ["Rashid and his grandfather were walking across the dunes when the sky began to turn orange. \"A sandstorm is coming,\" said Grandfather calmly. \"We must find shelter.\"", "Rashid felt scared because the wind was getting stronger. Grains of sand stung his face. \"What shall we do?\" he shouted.", "\"When I was a boy, my father taught me what to do,\" said Grandfather. He pulled his scarf over his nose and mouth, and Rashid did the same. Then they hurried towards a large rock that stood at the bottom of the dune.", "They crouched behind the rock while the storm roared over them. Rashid closed his eyes tightly. If he had been alone, he would have been terrified. But Grandfather held his hand, and he felt safe.", "After an hour, the wind dropped. The sky turned blue again. Rashid shook the sand out of his hair and laughed. \"I'll never forget that,\" he said.", "Grandfather smiled. \"One day, you will teach your own grandchildren what to do,\" he said."],
    vocab: { shelter: "a safe place away from danger", crouched: "bent down low", terrified: "very, very scared" },
    questions: [["What was the first sign that a sandstorm was coming?", ["The sky began to turn orange.", "It started to rain.", "Camels ran past."], 0, "retrieval"], ["What did they put over their noses and mouths?", ["their scarves", "their hands", "their hats"], 0, "retrieval"], ["Where did they shelter?", ["behind a large rock", "in a tent", "in a car"], 0, "retrieval"], ["Why did Rashid feel safe?", ["Grandfather held his hand.", "The storm was small.", "He was inside a house."], 0, "inference"], ["What does Grandfather mean at the end?", ["Rashid will pass on what he learned.", "Rashid will be a teacher at school.", "Rashid will have lots of sand."], 0, "inference"]],
    grammar: Object.assign({}, GSUB, { spots: ["because the wind was getting stronger", "When I was a boy", "that stood at the bottom of the dune", "while the storm roared over them", "If he had been alone"], practice: subPractice }) },
  { id: "g10-sleep", band: 10, title: "Why Do We Need Sleep?", type: "Information", text: ["Everybody needs sleep. Children your age need about ten or eleven hours every night. But why is sleep so important?", "When you sleep, your body is busy. It mends any small injuries and helps you to grow. Your brain is busy too. It sorts out everything you learned during the day, so that you can remember it later.", "If you don't get enough sleep, you may feel grumpy and find it hard to concentrate. You might make more mistakes because your brain is tired.", "Here are some tips for a good night's sleep. Go to bed at the same time every night. Turn off screens an hour before bed, because the light from screens can keep you awake. Read a book or listen to calm music instead.", "When you wake up feeling rested, you'll be ready to learn, play and have fun!"],
    vocab: { injuries: "places where your body has been hurt", concentrate: "think hard about one thing", rested: "not tired any more" },
    questions: [["How much sleep do children need?", ["about ten or eleven hours", "about five hours", "about two hours"], 0, "retrieval"], ["What does your brain do while you sleep?", ["It sorts out what you learned during the day.", "It switches off completely.", "It watches dreams on a screen."], 0, "retrieval"], ["What might happen if you don't get enough sleep?", ["You may feel grumpy and find it hard to concentrate.", "You will grow faster.", "You will never be hungry."], 0, "retrieval"], ["Why should you turn off screens before bed?", ["Their light can keep you awake.", "They get too hot.", "They are too loud."], 0, "retrieval"], ["What does \"concentrate\" mean?", ["think hard about one thing", "fall asleep", "feel grumpy"], 0, "vocabulary"]],
    grammar: Object.assign({}, GSUB, { spots: ["When you sleep", "so that you can remember it later", "If you don't get enough sleep", "because your brain is tired", "because the light from screens can keep you awake", "When you wake up feeling rested"], practice: subPractice }) },
  { id: "g10-friend", band: 10, title: "How to Be a Good Friend", type: "Information", text: ["Having friends makes life more fun. But friendship takes work! Here are some ways to be a good friend.", "Be kind. Small acts of kindness, like sharing a snack or saying something nice, can make a big difference.", "Listen carefully. When your friend is talking, look at them and really listen. Don't interrupt.", "Be helpful. If your friend is stuck, offer to help. If they are sad, ask what's wrong.", "Be honest. Good friends tell the truth, even when it's hard. Honesty helps friends trust each other.", "Say sorry. Everybody makes mistakes. If you are thoughtless or careless with your words, say sorry quickly and mean it.", "Be fair. Take turns, share fairly and include others in your games. Nobody likes to feel left out or friendless.", "Remember, the best way to have a good friend is to be one!"],
    vocab: { interrupt: "start talking while someone else is speaking", trust: "believe someone is honest and good" },
    questions: [["What does the text say small acts of kindness can do?", ["make a big difference", "make you tired", "cost money"], 0, "retrieval"], ["What should you do when your friend is talking?", ["look at them and really listen", "talk at the same time", "walk away"], 0, "retrieval"], ["Why is honesty important for friends?", ["It helps friends trust each other.", "It makes them laugh.", "It stops arguments forever."], 0, "retrieval"], ["What does \"interrupt\" mean?", ["start talking while someone else is speaking", "listen carefully", "say sorry"], 0, "vocabulary"], ["What is the main message of the last line?", ["To have a good friend, be a good friend.", "Friends are hard to find.", "Games are fun."], 0, "summarising"]],
    grammar: Object.assign({}, GSUF, { spots: ["kindness", "carefully", "helpful", "Honesty", "thoughtless", "careless", "quickly", "fairly", "friendless"], practice: sufPractice }) },
  { id: "g10-dinosaurs", band: 10, title: "Dinosaur Detectives", type: "Information", text: ["Dinosaurs lived millions of years ago, long before there were any people. So how do we know so much about them? We've learned it all from fossils.", "A fossil is the remains of a plant or animal that's been turned to rock over a very long time. Scientists who study fossils are called palaeontologists. They're a bit like detectives!", "A dinosaur's teeth can tell us what it ate. Tyrannosaurus rex's teeth were long, sharp and curved, so it must have eaten meat. Diplodocus's teeth were thin, like pegs, so it probably stripped leaves from trees.", "Footprints can tell us how fast a dinosaur walked, and whether it lived alone or in a group. Some dinosaurs' eggs have even been found, with tiny babies still inside!", "Fossils are still being found today. Who knows? Maybe you'll discover a new dinosaur one day!"],
    vocab: { fossils: "the remains of very old plants or animals that have turned to rock", palaeontologists: "scientists who study fossils", remains: "what is left after something has died" },
    questions: [["How do we know about dinosaurs?", ["from fossils", "from photographs", "from people who saw them"], 0, "retrieval"], ["What are scientists who study fossils called?", ["palaeontologists", "astronauts", "doctors"], 0, "retrieval"], ["How do we know Tyrannosaurus rex ate meat?", ["Its teeth were long, sharp and curved.", "It was very big.", "It had short arms."], 0, "inference"], ["What can footprints tell us?", ["how fast a dinosaur walked", "what colour it was", "what it ate"], 0, "retrieval"], ["Why are palaeontologists \"a bit like detectives\"?", ["They use clues to work things out.", "They wear hats.", "They catch thieves."], 0, "inference"]],
    grammar: Object.assign({}, GAPOS, { spots: ["We've", "that's", "They're", "A dinosaur's teeth", "Tyrannosaurus rex's teeth", "Diplodocus's teeth", "you'll"], practice: aposPractice }) },
  { id: "g10-thankyou", band: 10, title: "A Thank-You Letter", type: "Letter", text: ["Dear Auntie Mona,", "Thank you so much for my birthday present. I'm so happy with the paint set! It's got thirty colours, and I've already used nearly all of them.", "Yesterday, I painted a picture of Grandad's garden. I tried to paint his lemon tree, but I couldn't get the yellow right, so I mixed in a little white. Grandad's going to put it on his kitchen wall!", "I've also painted Mum's cat, Pepper. She wouldn't sit still, so her tail looks a bit wobbly. Mum says it's the best picture she's ever seen of a wobbly cat.", "I can't wait to see you in the holidays. I'll paint a picture of you, if you promise not to wiggle like Pepper!", "Lots of love,", "Layla"],
    vocab: { wiggle: "move in small, quick twists" },
    questions: [["What did Auntie Mona give Layla?", ["a paint set", "a cat", "a lemon tree"], 0, "retrieval"], ["What did Layla paint first?", ["Grandad's garden", "Mum's cat", "Auntie Mona"], 0, "sequencing"], ["Why does Pepper's tail look wobbly?", ["She wouldn't sit still.", "Layla ran out of paint.", "Pepper has a wobbly tail."], 0, "retrieval"], ["How does Layla feel about her present?", ["very happy", "disappointed", "bored"], 0, "inference"], ["Why is this text written as a letter?", ["to thank someone and tell them news", "to give instructions", "to tell a made-up story"], 0, "structure"]],
    grammar: Object.assign({}, GAPOS, { spots: ["I'm", "It's", "I've", "Grandad's garden", "couldn't", "Grandad's going", "Mum's cat", "wouldn't", "she's", "can't", "I'll"], practice: aposPractice }) },
  { id: "g10-growup", band: 10, title: "When I Grow Up", type: "Poem", text: ["When I grow up, I'd like to be", "A pilot flying high and free,", "Or if I'm brave, I'll dive the sea", "Because the fish are calling me.", "When I grow up, I think that I", "Could build a rocket to the sky,", "Or bake a giant pumpkin pie", "So big that it could make you cry!", "But if I'm honest, here and now,", "I don't know when, and I don't know how,", "So I'll keep dreaming anyhow,", "Because I'm only little now!"],
    vocab: { pilot: "a person who flies a plane", anyhow: "anyway" },
    questions: [["What would the poet do if they were brave?", ["dive the sea", "fly a plane", "bake a pie"], 0, "retrieval"], ["What could the poet build?", ["a rocket to the sky", "a house", "a boat"], 0, "retrieval"], ["How big would the pumpkin pie be?", ["so big it could make you cry", "very tiny", "as big as a car"], 0, "retrieval"], ["Why does the poet keep dreaming?", ["They are only little now and don't know yet.", "They are tired.", "They don't like their job."], 0, "inference"], ["Which word rhymes with \"sky\"?", ["pie", "sea", "now"], 0, "language"]],
    grammar: Object.assign({}, GSUB, { spots: ["When I grow up", "if I'm brave", "Because the fish are calling me", "that I", "So big that it could make you cry", "if I'm honest", "Because I'm only little now"], practice: subPractice }) },
  { id: "g10-shhh", band: 10, title: "Shhh!", type: "Poem", text: ["Quietly, quietly, tiptoe in,", "The baby's sleeping, don't make a din.", "Gently, gently, close the door,", "Softly, softly, cross the floor.", "Carefully, carefully, put down your cup,", "Slowly, slowly, don't wake her up.", "Silently, silently, not a peep...", "Phew! At last, she's fast asleep."],
    vocab: { din: "a loud, unpleasant noise", tiptoe: "walk quietly on your toes", peep: "a tiny sound" },
    questions: [["Who is sleeping?", ["the baby", "the cat", "Grandad"], 0, "retrieval"], ["How should you close the door?", ["gently", "quickly", "loudly"], 0, "retrieval"], ["What does \"din\" mean?", ["a loud, unpleasant noise", "a quiet song", "dinner"], 0, "vocabulary"], ["Why are the words repeated, like \"Quietly, quietly\"?", ["to make it sound calm and quiet", "because the poet forgot", "to make it louder"], 0, "language"], ["How does the poet feel at the end?", ["relieved", "angry", "sleepy"], 0, "inference"]],
    grammar: Object.assign({}, GSUF, { spots: ["Quietly, quietly", "Gently, gently", "Softly, softly", "Carefully, carefully", "Slowly, slowly", "Silently, silently"],
      practice: [["quiet + ly =", ["quietly", "quietlly", "quiettly"], 0], ["What do the -ly words in this poem tell us?", ["how to do things", "where things are", "who is sleeping"], 0], ["Which word means \"in a careful way\"?", ["carefully", "careless", "careful"], 0]] }) }
];
TEST_A[10] = GOLD_A; TEST_B[10] = GOLD_B; TEXTS.push(...GOLD_TEXTS);
