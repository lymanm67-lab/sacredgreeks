// Image URL mappings for Symbol Guide entries
// These are imported dynamically based on entry ID

// Deity images
import ahuraMazda from '@/assets/symbols/ahura-mazda.jpg';
import anubis from '@/assets/symbols/anubis.jpg';
import apollo from '@/assets/symbols/apollo.jpg';
import asclepius from '@/assets/symbols/asclepius.jpg';
import athena from '@/assets/symbols/athena.jpg';
import elDeity from '@/assets/symbols/el-deity.jpg';
import hermes from '@/assets/symbols/hermes.jpg';
import horusEye from '@/assets/symbols/horus-eye.jpg';
import hygieia from '@/assets/symbols/hygieia.jpg';
import ishtarGate from '@/assets/symbols/ishtar-gate.jpg';
import isis from '@/assets/symbols/isis.jpg';
import ladyJustice from '@/assets/symbols/lady-justice.jpg';
import lampKnowledge from '@/assets/symbols/lamp-knowledge.jpg';
import maat from '@/assets/symbols/maat.jpg';
import marduk from '@/assets/symbols/marduk.jpg';
import mithra from '@/assets/symbols/mithra.jpg';
import omegaSymbol from '@/assets/symbols/omega-symbol.jpg';
import phoenix from '@/assets/symbols/phoenix.jpg';
import ra from '@/assets/symbols/ra.jpg';
import scarab from '@/assets/symbols/scarab.jpg';
import shamash from '@/assets/symbols/shamash.jpg';
import sphinx from '@/assets/symbols/sphinx.jpg';
import thoth from '@/assets/symbols/thoth.jpg';
import zeus from '@/assets/symbols/zeus.jpg';
import poseidon from '@/assets/symbols/poseidon.jpg';
import demeter from '@/assets/symbols/demeter.jpg';
import hera from '@/assets/symbols/hera.jpg';
import odin from '@/assets/symbols/odin.jpg';
import thor from '@/assets/symbols/thor.jpg';
import freya from '@/assets/symbols/freya.jpg';

// Seal images
import greatSealUs from '@/assets/symbols/great-seal-us.jpg';
import statueFreedom from '@/assets/symbols/statue-freedom.jpg';
import supremeCourtFrieze from '@/assets/symbols/supreme-court-frieze.jpg';
import libraryCongressMinerva from '@/assets/symbols/library-congress-minerva.jpg';
import virginiaSeal from '@/assets/symbols/virginia-seal.jpg';
import californiaSeal from '@/assets/symbols/california-seal.jpg';
import newYorkSeal from '@/assets/symbols/new-york-seal.jpg';
import columbiaUniversitySeal from '@/assets/symbols/columbia-university-seal.jpg';
import yaleUniversitySeal from '@/assets/symbols/yale-university-seal.jpg';
import princetonUniversitySeal from '@/assets/symbols/princeton-university-seal.jpg';
import harvardUniversitySeal from '@/assets/symbols/harvard-university-seal.jpg';
import howardUniversitySeal from '@/assets/symbols/howard-university-seal.jpg';
import spelmanCollegeSeal from '@/assets/symbols/spelman-college-seal.jpg';
import morehouseCollegeSeal from '@/assets/symbols/morehouse-college-seal.jpg';

export const symbolImageUrls: Record<string, string> = {
  // Deities
  "ahura-mazda": ahuraMazda,
  "anubis-deity": anubis,
  "apollo-deity": apollo,
  "asclepius-deity": asclepius,
  "athena-deity": athena,
  "el-deity": elDeity,
  "hermes-deity": hermes,
  "horus-eye-deity": horusEye,
  "hygieia-deity": hygieia,
  "ishtar-gate": ishtarGate,
  "isis-deity": isis,
  "lady-justice-deity": ladyJustice,
  "lamp-knowledge-deity": lampKnowledge,
  "maat-deity": maat,
  "marduk-deity": marduk,
  "mithra-deity": mithra,
  "omega-symbol-deity": omegaSymbol,
  "phoenix-deity": phoenix,
  "ra-deity": ra,
  "scarab-deity": scarab,
  "shamash-deity": shamash,
  "sphinx-deity": sphinx,
  "thoth-deity": thoth,
  "zeus-deity": zeus,
  "poseidon-deity": poseidon,
  "demeter-deity": demeter,
  "hera-deity": hera,
  "odin-deity": odin,
  "thor-deity": thor,
  "freya-deity": freya,
  
  // Seals
  "great-seal-us": greatSealUs,
  "statue-of-freedom": statueFreedom,
  "supreme-court-frieze": supremeCourtFrieze,
  "library-congress-minerva": libraryCongressMinerva,
  "virginia-seal": virginiaSeal,
  "california-seal": californiaSeal,
  "new-york-seal": newYorkSeal,
  "columbia-university-seal": columbiaUniversitySeal,
  "yale-university-seal": yaleUniversitySeal,
  "princeton-university-seal": princetonUniversitySeal,
  "harvard-university-seal": harvardUniversitySeal,
  "howard-university-seal": howardUniversitySeal,
  "spelman-college-seal": spelmanCollegeSeal,
  "morehouse-college-seal": morehouseCollegeSeal,
};

export const getSymbolImageUrl = (id: string): string | undefined => {
  return symbolImageUrls[id];
};
