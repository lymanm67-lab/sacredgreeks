// Image URL mappings for Symbol Guide entries
// These are imported dynamically based on entry ID

export const symbolImageUrls: Record<string, string> = {
  // Deities
  "ahura-mazda": "/src/assets/symbols/ahura-mazda.jpg",
  "anubis-deity": "/src/assets/symbols/anubis.jpg",
  "apollo-deity": "/src/assets/symbols/apollo.jpg",
  "asclepius-deity": "/src/assets/symbols/asclepius.jpg",
  "athena-deity": "/src/assets/symbols/athena.jpg",
  "el-deity": "/src/assets/symbols/el-deity.jpg",
  "hermes-deity": "/src/assets/symbols/hermes.jpg",
  "horus-eye-deity": "/src/assets/symbols/horus-eye.jpg",
  "hygieia-deity": "/src/assets/symbols/hygieia.jpg",
  "ishtar-gate": "/src/assets/symbols/ishtar-gate.jpg",
  "isis-deity": "/src/assets/symbols/isis.jpg",
  "lady-justice-deity": "/src/assets/symbols/lady-justice.jpg",
  "lamp-knowledge-deity": "/src/assets/symbols/lamp-knowledge.jpg",
  "maat-deity": "/src/assets/symbols/maat.jpg",
  "marduk-deity": "/src/assets/symbols/marduk.jpg",
  "mithra-deity": "/src/assets/symbols/mithra.jpg",
  "omega-symbol-deity": "/src/assets/symbols/omega-symbol.jpg",
  "phoenix-deity": "/src/assets/symbols/phoenix.jpg",
  "ra-deity": "/src/assets/symbols/ra.jpg",
  "scarab-deity": "/src/assets/symbols/scarab.jpg",
  "shamash-deity": "/src/assets/symbols/shamash.jpg",
  "sphinx-deity": "/src/assets/symbols/sphinx.jpg",
  "thoth-deity": "/src/assets/symbols/thoth.jpg",
  "zeus-deity": "/src/assets/symbols/zeus.jpg",
  "poseidon-deity": "/src/assets/symbols/poseidon.jpg",
  "demeter-deity": "/src/assets/symbols/demeter.jpg",
  "hera-deity": "/src/assets/symbols/hera.jpg",
  "odin-deity": "/src/assets/symbols/odin.jpg",
  "thor-deity": "/src/assets/symbols/thor.jpg",
  "freya-deity": "/src/assets/symbols/freya.jpg",
  
  // Seals
  "great-seal-us": "/src/assets/symbols/great-seal-us.jpg",
  "statue-of-freedom": "/src/assets/symbols/statue-freedom.jpg",
  "supreme-court-frieze": "/src/assets/symbols/supreme-court-frieze.jpg",
  "library-congress-minerva": "/src/assets/symbols/library-congress-minerva.jpg",
  "virginia-seal": "/src/assets/symbols/virginia-seal.jpg",
  "california-seal": "/src/assets/symbols/california-seal.jpg",
  "new-york-seal": "/src/assets/symbols/new-york-seal.jpg",
  "columbia-university-seal": "/src/assets/symbols/columbia-university-seal.jpg",
  "yale-university-seal": "/src/assets/symbols/yale-university-seal.jpg",
  "princeton-university-seal": "/src/assets/symbols/princeton-university-seal.jpg",
  "harvard-university-seal": "/src/assets/symbols/harvard-university-seal.jpg",
  "howard-university-seal": "/src/assets/symbols/howard-university-seal.jpg",
  "spelman-college-seal": "/src/assets/symbols/spelman-college-seal.jpg",
  "morehouse-college-seal": "/src/assets/symbols/morehouse-college-seal.jpg",
};

export const getSymbolImageUrl = (id: string): string | undefined => {
  return symbolImageUrls[id];
};
