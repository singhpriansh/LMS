const SYLLABUS = [
  {
    branch: "Computer Science and Engineering",
    subject: [
      {
        name: "Engineering Chemistry",
        code: "ECH 101",
        unit: [
          {
            unit_number: 1,
            sections: [
              {
                name: "Periodicity & Chemical Bonding",
                section_topics: [
                  "Atomic radii",
                  "Ionization potential",
                  "Electro negativity",
                  "Electropositivity",
                  "Electron affinity and their periodicity",
                  "Hybridization involving s, p and d orbital",
                  "Partialionic character",
                  "Dipole moment and its applications",
                  "Hydrogen bond and Vander Waal’s forces",
                  "Elementary treatment of M.O. theory and its application to homo nuclear diatomic molecules of I and II period elements"
                ]
              },
              {
                name: "Phase Rule",
                section_topics: [
                    "Gibbs phase rule (without derivation)",
                    "Applications of Phase rule to one component system (H2O and S) and two component system (KI- H2O system)"
                ]
              }
            ]
          },
          {
            unit_number: 2,
            sections: [
              {
                name: "Chemical kinetics",
                section_topics: [
                  "Arrhenius equation",
                  "determination of activation energy",
                  "Theories of reaction rates(collision and absolute reaction rate theory)"
                ]
              },
              {
                name: "Photochemistry",
                section_topics: [
                  "Laws of Photochemistry",
                  "Quantum yield",
                  "Fluorescence",
                  "Phosphorescence",
                  "Chemiluminescence",
                  "Jabolinski diagram"
                ]
              }
            ]
          },
          {
            unit_number: 3,
            sections: [
              {
                name: "Water Analysis",
                section_topics: [
                  "Hard & soft water",
                  "Specification of water",
                  "Analysis of water-alkalinity",
                  "hardness(EDTA Method only) of water for domestic use",
                  "Water softening-soda-lime process",
                  "anion exchangers",
                  "Boiler-feed water",
                  "Boiler problems-scale and sludge",
                  "priming & forming",
                  "Caustic embittlement & corrosion",
                  "their cause and prevention (Removal of dissolved gases, carbonate treatment, Phosphate conditioning, Colloidal conditioning)",
                  "numerical problems based on hardness",
                  "Solid impurities (filterable, non-filterable)",
                  "pH",
                  "D.O",
                  "B.O.D.",
                  "C.O.D"
                ]
              },
              {
                name: "Polymers",
                section_topics: [
                  "Polymers",
                  "Thermoplastics",
                  "Thermosetting plastic",
                  "Linear, branched & cross linked polymers",
                  "Industrial application of polymers",
                  "Addition, condensation polymerizations",
                  "Plastics Structure",
                  "Plastics Properties",
                  "Plastics uses of thermoplastic (Polyvinyl chloride, Teflon, Nylons and Polymethyl methacrylate) and thermosetting (Bakelite) materials",
                  "Rubber natural Rubber and it’s preparations",
                  "Rubber vulcanization",
                  "Rubber mechanism of vulcanization",
                  "Rubber synthetic rubber (General)"
                ]
              }
            ] 
          },
          {
            unit_number: 4,
            sections: [
              {
                name: "Fuels",
                section_topics: [
                  "Definition and classification",
                  "Calorific value; Gross & Net calorific value and their determination by Bomb calorimeter",
                  "Solid fuels Coke-it’s manufacture by Otto Hoffman oven and uses",
                  {
                    "Liquid fuels":[
                      "Conversion of coal into liquid fuels (Bergius process & Fischer Tropsch process and mechanism)",
                      "Petroleum- its chemical composition and fractional distillation",
                      "Cracking of Heavy oil residues (Thermal cracking and catalytic cracking)",
                      "Knocking & Anti knocking agents",
                      "octane and cetane numbers and their significance"
                    ],
                    "Gaseous fuels":[
                      "Natural Gas",
                      "Producer gas",
                      "Water gas",
                      "Carburetted water gas",
                      "Coal gas and Oil gas"
                    ],
                    "Nuclear fuels":[
                      "Nuclear fission and nuclear fusion",
                      "Nuclear reactor"
                    ]
                  }
                ]
              },
              {
                name: "Corrosion",
                section_topics: [
                    "Definition and types of corrosion",
                    "Electrochemical Theory of corrosion",
                    "Laws of oxide film",
                    "Different theories of corrosion",
                    "Atmospheric corrosion",
                    "Stress corrosion water line",
                    "Pitting and soil corrosion",
                    "Protective measures against corrosion "
                ]
              }
            ]
          },
          {
            unit_number: 5,
            sections: [
              {
                name: "Lubricants",
                section_topics: [
                  "Principle of Lubrication",
                  "types of Lubrication",
                  "Lubricating oil",
                  "Fraction from crude oil",
                  "De-waxing of oil fraction",
                  "Acid and solvent",
                  "Refining of lubricating oils",
                  "Properties of refined oils(viscosity, viscosity index, acid value, saponification value & iodine value)",
                  "Pour point and cloud point",
                  "Flash point and fire point",
                  "Aniline point and their determination",
                  "Lubricant greases (Semi solid) and their Penetration and drop point tests",
                  "Solid lubricants"
                ]
              },
              {
                name: "Name Reactions",
                section_topics: [
                  "Reimer Tieman reaction",
                  "Aldol Condensation",
                  "Diel’s Alder Reaction",
                  "Wurt’z Reaction",
                  "Claisen Reaction"
                ]
              }
            ]
          }
        ]
      },
      {
        name: "Advanced Computer Networks",
        code: "ECS 802",
        unit: [
          {
            unit_number: 1,
            sections: [
              {
                name: "Modeling",
                section_topics: [
                  "OSI model and TCP/IP model",
                  "Layered architecture",
                  "layer interfaces",
                  "Services and protocols",
                  "ATM (Design Goals, Problems, Architecture)",
                  "ATM Connection establishment and release",
                  "ATM switching", "ATM layers", "QoS in ATM"
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

module.exports = SYLLABUS