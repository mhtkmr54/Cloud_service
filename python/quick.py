import json
import gspread
from oauth2client.client import SignedJwtAssertionCredentials

json_key = json.load(open('shaastra-cloud-service-59070e60496e.json'))
scope = ['https://spreadsheets.google.com/feeds']

credentials = SignedJwtAssertionCredentials(json_key['client_email'], json_key['private_key'].encode(), scope)

gc = gspread.authorize(credentials)

wks = gc.open("Where is the money Lebowski?").sheet1
