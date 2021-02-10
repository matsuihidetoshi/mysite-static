import json
import boto3

REGION = 'ap-northeast-1'
SRC_MAIL = "dev.matsuihidetoshi@gmail.com"
DST_MAIL = "dev.matsuihidetoshi@gmail.com"
SENTIMENTS = {
    "NEUTRAL": "中立的",
    "POSITIVE": "肯定的",
    "NEGATIVE": "否定的",
    "MIXED": "混在"
}
LANGUAGE_CODE = 'ja'

def detect_text_sentiment(text):#Comprehendを使って感情を検知するメソッド
    comprehend = boto3.client('comprehend', region_name=REGION)
    response = comprehend.detect_sentiment(Text=text, LanguageCode=LANGUAGE_CODE)
    return response

def send_email(source, to, subject, body):#SESでメールを送るメソッド
    ses = boto3.client('ses', region_name=REGION)
 
    response = ses.send_email(
        Source=source,
        Destination={
            'ToAddresses': [
                to,
            ]
        },
        Message={
            'Subject': {
                'Data': subject,
            },
            'Body': {
                'Text': {
                    'Data': body,
                },
            }
        }
    )
     
    return response

def lambda_handler(event, context):
    sentiment = detect_text_sentiment(event['content'])['Sentiment']
    body = "件名:\n" + event['title'] + "\n" + "\n連絡先:\n" + event['contact'] + "\n" + "\n感情:\n" + SENTIMENTS[sentiment] + "\n" + "\n内容:\n" + event['content']
    mail = send_email(SRC_MAIL, DST_MAIL, '[' + SENTIMENTS[sentiment] + '] ' + 'お問い合わせがありました', body)
    
    return {
        'statusCode': 200,
        'body': {
            'sentiment': sentiment,
            'mail': mail
        }
    }
