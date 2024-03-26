import smtplib
email_address = 'pythondjango38@gmail.com'     # add email address here
content = ' Dear Test, \n This is a test message.\n\n ' 
passcode = 'jglvcnjzypptdnrq'        # add passcode here
conn = smtplib.SMTP_SSL('smtp.gmail.com', 465) 
conn.ehlo()
conn.login(email_address, passcode)
conn.sendmail(email_address,
              email_address,
              content)
conn.quit()
