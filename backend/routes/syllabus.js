const express = require("express");
const router = express.Router();
const Syllabus = require("../models/syllabus");

router.get("", (req,res,next) => {
  const SYLLABUS = {
    branch: "Computer Science and Engineering",
    subject: [
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
  res.json(SYLLABUS);
})
// router.post("");

module.exports = router