const pageSchema = [
  {
    "_id": "1",
    "title": "Safety",
    "subtitle": "Stay safe and follow along with the steps above.",
    "order": 1,
    "accordions": [
      {
        "title": "Stop, stay close",
        "text": "Stop as close as you can to the crash site and turn off your car. If you are able, you want to make sure that everyone is safe. Check everyone in your car and anyone else involved in the collision."
      },
      {
        "title": "Are the vehicles in a safe place?",
        "text": "[tbd]"
      },
      {
        "title": "Any immediate attention needed? Tell people not to move",
        "text": "Does anyone need immediate medical attention? Unless there is an urgent danger, do not move any injured people."
      },
      {
        "title": "Call 911 to report the incident",
        "text": "As soon as you have completed your survey, call 911 and report the collision, location and injuries as best you can."
      },
      {
        "title": "Wait for the police to arrive",
        "text": "Wait for the police to arrive. Do not leave, and insist that the other driver(s) remain at the scene."
      },
      {
        "title": "Don't admit fault",
        "text": "Do not admit fault even if you think you’re wrong. The other person may be at fault according to the law. (When I was in college, my car died in the middle of a busy road and I was slammed into by another car. I felt it was my fault because my car died. However, it was the other persons fault because they  were traveling too fast to stop in time)."
      },
      {
        "title": "Don't say you’re uninjured",
        "text": "Do not tell the police officer that you are uninjured; tell him/her that you will go to your doctor to determine if there are any injuries."
      },
      {
        "title": "Don't accept payment",
        "text": "Do not accept any immediate payment. Sometimes the other person who is at fault will attempt to pay you off on the spot to keep the accident off the record. Do not go there. There are still too many variables to determine. For example, there may be hidden damage to you or your car."
      }
    ]
  },
  {
    "_id": "2",
    "title": "Cooperate",
    "subtitle": "Cooperate with the police.",
    "order": 2,
    "accordions": [
      {
        "title": "Cooperate with the police",
        "text": "The police are trained to handle all the details of an accident. Tell the officers how the accident happened. Fully describe the events that led up to the crash and those that followed after. The police should document what you told them in the police report. Always read it at your first opportunity. The police can also help with the next order of business."
      }
    ]
  },
  {
    "_id": "3",
    "title": "Get Info",
    "subtitle": "Stay safe and follow along with the steps above.",
    "order": 3,
    "accordions": [
      {
        "title": "Driver information",
        "text": "Enter the other driver's information",
        "form_id": "getInfo",
        "fields": [
          {
            "name": "driverInfo.name",
            "type": "text",
            "placeholder": "Name",
          },
          {
            "name": "driverInfo.address",
            "type": "textarea",
            "placeholder": "Address"
          },
          {
            "name": "driverInfo.phone",
            "type": "tel",
            "placeholder": "Phone"
          },
          {
            "name": "driverInfo.email",
            "type": "email",
            "placeholder": "Email"
          },
          {
            "name": "driverInfo.license",
            "type": "text",
            "placeholder": "License Number"
          }
        ]
      },
      {
        "title": "Passenger information",
        "repeatableFields": true,
        "form_id": "passengerInfo",
        "fields": [
          {
            "name": "passengerInfo.$.name",
            "type": "text",
            "placeholder": "Name",
          },
          {
            "name": "passengerInfo.$.phone",
            "type": "tel",
            "placeholder": "Phone"
          },
          {
            "name": "passengerInfo.$.email",
            "type": "email",
            "placeholder": "Email"
          }
        ]
      },
      {
        "title": "Vehicle information",
        "form_id": "vehicleInfo",
        "fields": [
          {
            "name": "vehicleInfo.make",
            "type": "text",
            "placeholder": "Vehicle Make",
          },
          {
            "name": "vehicleInfo.model",
            "type": "text",
            "placeholder": "Vehicle Model"
          },
          {
            "name": "vehicleInfo.year",
            "type": "number",
            "placeholder": "Vehicle Year"
          },
          {
            "name": "vehicleInfo.plate",
            "type": "text",
            "placeholder": "Vehicle Plate"
          }
        ]
      },
      {
        "title": "Registered owner information",
        "text": "If the other driver is not the registered owner of the vehicle, add their information below",
        "form_id": "ownerInfo",
        "fields": [
          {
            "name": "ownerInfo.name",
            "type": "text",
            "placeholder": "Name",
          },
          {
            "name": "ownerInfo.address",
            "type": "textarea",
            "placeholder": "Address"
          },
          {
            "name": "ownerInfo.phone",
            "type": "tel",
            "placeholder": "Phone"
          },
          {
            "name": "ownerInfo.email",
            "type": "email",
            "placeholder": "Email"
          },
          {
            "name": "ownerInfo.license",
            "type": "text",
            "placeholder": "License Number"
          }
        ]
      },
      {
        "title": "Insurance information",
        "form_id": "insuranceInfo",
        "fields": [
          {
            "name": "insuranceInfo.company",
            "type": "text",
            "placeholder": "Company Name",
          },
          {
            "name": "insuranceInfo.policyNumber",
            "type": "text",
            "placeholder": "Insurance Policy Number"
          },
          {
            "name": "insuranceInfo.agent",
            "type": "text",
            "placeholder": "Insurance Agent"
          }
        ]
      },
      {
        "title": "Time and Location",
        "form_id": "timeLocation",
        "fields": [
          {
            "name": "timeLocation.date",
            "type": "date",
            "placeholder": "Date"
          },
          {
            "name": "timeLocation.time",
            "type": "date",
            "placeholder": "time"
          },
          {
            "name": "timeLocation.location",
            "type": "textarea",
            "placeholder": "Location"
          }
        ]
      },
      {
        "title": "Traffic Information",
        "text": "Describe the road conditions",
        "form_id": "trafficInfo",
        "fields": [
          {
            "name": "trafficInfo.roadConditions",
            "type": "textarea",
            "placeholder": "Describe the Road Conditions"
          },
          {
            "name": "trafficInfo.trafficControls",
            "type": "textarea",
            "placeholder": "Describe the traffic controls and signs."
          }
        ]
      },
      {
        "title": "Witness information",
        "repeatableFields": true,
        "form_id": "witnessInfo",
        "fields": [
          {
            "name": "witnessInfo.$.name",
            "type": "text",
            "placeholder": "Name",
          },
          {
            "name": "witnessInfo.$.phone",
            "type": "tel",
            "placeholder": "Phone"
          },
          {
            "name": "witnessInfo.$.email",
            "type": "email",
            "placeholder": "Email"
          },
          {
            "name": "witnessInfo.$.testimony",
            "type": "textarea",
            "placeholder": "Witness Comments or Testimony"
          }
        ]
      },
      {
        "title": "Any symptoms",
        "text": "TBD",
        "form_id": "symptoms",
        "fields": [
          {
            "name": "symptoms",
            "type": "text",
            "placeholder": "Symptoms"
          }
        ]
      },
      {
        "title": "Driver statement",
        "text": "Any statements the other driver makes, even if it is “I’m sorry” or “I didn’t see you”",
        "form_id": "driverStatement",
        "fields": [
          {
            "name": "driverStatement",
            "type": "textarea",
            "placeholder": "Driver Statement"
          }
        ]
      },
      {
        "title": "Make a sketch of the collision",
        "text": "Draw a picture of the accident, then take a picture of it with your phone.",
        "form_id": "sketch",
        "fields": [
          {
            "name": "sketch",
            "type": "photo"
          }
        ]
      },
      {
        "title": "Take pictures",
        "text": "Take pictures of everything — the vehicles, the license plates, the licenses, damage to the cars, even skid marks if you are able.",
        "form_id": "pictures",
        "repeatableFields": true,
        "fields": [
          {
            "name": "photos",
            "type": "photo"
          }
        ]
      },
      {
        "title": "Fill out an /“Operator’s report.“",
        "text": "As soon as is practical you should fill out an Operator’s Report. This can be downloaded at: www.massrmv.com/rmv/forms/21278.pdf (This is for Massachusetts residents, but other states have similar options. You could always fill this one out first while researching where to get the form for your state.) The sooner you complete these steps the better, while your memory is focused on the events."
      }
    ]
  },
  {
    "_id": "4",
    "title": "Notify insurance",
    "subtitle": "Next step is to notify insurance.",
    "order": 4,
    "accordions": [
      {
        "title": "Notify Insurance",
        "text": "Inform them of any injuries to you or your passengers. Remember that many times pain from these injuries may not happen for several hours or days after a collision. Do not volunteer much information here. Keep it simple. “I was in an accident, and my passenger and I have been hurt and we are going to the doctor.” Your insurance company may want other information, however you are not an expert in handling these situations. Leave it to a professional."
      }
    ]
  },
  {
    "_id": "5",
    "title": "Seek medical attention",
    "subtitle": "It's important to seek medical attention.",
    "order": 5,
    "accordions": [
      {
        "title": "Seek medical attention",
        "text": "TBD (currently )"
      }
    ]
  },
  {
    "_id": "6",
    "title": "Consult attorney",
    "subtitle": "Let professionals arbitrate on your behalf.",
    "order": 6,
    "accordions": [
      {
        "title": "Consult attorney",
        "text": "You are a teacher, financial advisor, housewife, baseball coach, etc. You are not an expert in insurance procedures and case law. Do not even think about handling your claim on your own. Having dealt with insurance companies for 25 years, I would never entertain the thought of handling an auto injury claim on my own. There are literally dozens of mistakes you can make in dealing with all the aspects of a bodily injury and compensation claim. I repeat, do not try to handle these complex situations on your own. Get help. The good news is that attorneys in this area work their cases on a contingent basis. This means they do not get paid unless you do. Once you get the initial documentation completed and hand off the administration of your claim to a professional, your main mission is to get well. Make all your doctor’s appointments, do your home rehabilitation exercises and get well. Your attorney’s job is to protect  your legal rights including just compensation for pain, suffering, inconvenience, lost wages, future health care needs and for any permanent injuries."
      }
    ]
  },
  {
    "_id": "7",
    "title": "Info on whiplash",
    "subtitle": "Whiplash is a common crash injury.",
    "order": 7,
    "accordions": [
      {
        "title": "Whiplash",
        "text": "TBD, too long"
      }
    ]
  }
]

export default pageSchema;
