# Installation:
Run ```npm install```

# Instruction:

## Step 1:
create data.json in repo root with the following content:
```json
{
	"schedule":
	[
		{
			"dayOfWeek": "Monday",
			"classes": [
				{"number": 1, "subject": "", "room": ""},
				{"number": 2, "subject": "", "room": ""},
				{"number": 3, "subject": "", "room": ""},
				{"number": 4, "subject": "", "room": ""},
				{"number": 5, "subject": "", "room": ""},
				{"number": 6, "subject": "", "room": ""}
			]
		}
	],

	"time":
	{
		"title": "Time",
		"list":
		[
			{"number":  1, "info": "0:00 – 00:00"},
			{"number":  2, "info": "0:00 – 00:00"},
			{"number":  3, "info": "0:00 – 00:00"},
			{"number":  4, "info": "0:00 – 00:00"},
			{"number":  5, "info": "0:00 – 00:00"},
			{"number":  6, "info": "0:00 – 00:00"},
			{"number":  7, "info": "0:00 – 00:00"}
		]
	},

	"scale_factor": 3,
	"theme": "oled"
}

```


>*dayOfWeek:* string of Day of the week  
>*number:* index number  
>*subject:* Name of academic discipline  
>*room:* audience name or number  
>*scale_factor:* Factor for scale output image  
>*theme:* Theme for render (light, dark or oled)

## Step 2:
Run ```npm start```  
If render ends successfully your rendered schedule will be in `./rendered/` folder

# TODO:
1. - [x] Add time support
2. - [x] Add changing scale factor
3. - [x] Add link on Google fonts for font in head
