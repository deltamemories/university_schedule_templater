

# Installation:
Run ```npm install```

# Instruction:

## Step 1:
create data.json in repo root with the following content:
```json
[
    {
      "dayOfWeek": "",
      "classes": [
        {"number": 1, "subject": "", "room": ""},
        {"number": 2, "subject": "", "room": ""},
        {"number": 3, "subject": "", "room": ""},
        {"number": 4, "subject": "", "room": ""},
        {"number": 5, "subject": "", "room": ""},
        {"number": 6, "subject": "", "room": ""},
        {"number": 7, "subject": "", "room": ""}
      ]
    }
]
```

>*Note:* You can add many days of the week – put another days in json's root list  

>*dayOfWeek:* string of Day of the week  
>*number:* index number  
>*subject:* Name of academic discipline  
>*room:* audience name or number  

## Step 2:
Run ```npm start```  
If render ends successfully your rendered schedule will be in `./rendered/` folder
