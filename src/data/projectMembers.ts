import { PROJECT_TEAM } from "../lib/assets";

export const PROJECT_MEMBERS = [
  {
    key: "fatma",
    name: "Fatma Aksu",
    role: "PhD Candidate in University of Bologna Department of Psychology",
    photo: PROJECT_TEAM.fatmaAksu,
    website: "https://www.unibo.it/sitoweb/fatma.aksu2/en",
    linkedin: "https://www.linkedin.com/in/fatmaaksu/?locale=en",
  },
  {
    key: "saniat",
    name: "Saniat Sohrawardi (John)",
    role: "Postdoc, DeFake Project Lead at Rochester Institute of Technology",
    photo: PROJECT_TEAM.saniatSohrawardi,
    website: "https://nviable.me",
    linkedin: "https://www.linkedin.com/in/sohrawardi/",
    openToWork: true,
  },
  {
    key: "emanuel",
    name: "Emanuel Lukawiecki",
    role: "PhD Student, Carleton University",
    photo: PROJECT_TEAM.emanuelLukawiecki,
    website: "https://www.cigionline.org/people/emanuel-lukawiecki/",
    linkedin: "https://www.linkedin.com/in/emanuel-lukawiecki-6625ba17a/",
  },
] as const;
