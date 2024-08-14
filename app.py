from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

# 텔레그램 봇 토큰
tg_token = "7284683751:AAH-9QfBxHSApP_XAFeI2NOBjK_B9flbE1o"
# 텔레그램 봇 URL
bot_url = f"https://api.telegram.org/bot{tg_token}"

# 웹페이지에서 참가를 완료하면 이 URL로 POST 요청을 보냄
@app.route('/join', methods=['POST'])
def join():
    data = request.json
    user_id = data.get('user_id')
    
    # 텔레그램 봇의 /join 핸들러로 POST 요청을 보냄
    if user_id:
        requests.post(f"{bot_url}/sendMessage", data={
            "chat_id": user_id,
            "text": "참여가 완료되었습니다! 텔레그램에서 확인해보세요."
        })
        # 봇의 join 핸들러에서 처리될 수 있도록 update 메시지 전송
        requests.post(f"{bot_url}/answerCallbackQuery", data={
            "callback_query_id": data.get('callback_query_id'),
            "text": "참여가 완료되었습니다."
        })
        return jsonify({"status": "success"}), 200
    return jsonify({"status": "error", "message": "User ID missing"}), 400


@app.route('/')
def index():
    return """
    <html>
    <head><title>참여 페이지</title></head>
    <body>
        <h1>이벤트 참여</h1>
        <form action="/join" method="post">
            <input type="hidden" name="user_id" value="USER_ID_PLACEHOLDER">
            <button type="submit" style="font-size: x-large">참여완료</button>
        </form>
    </body>
    </html>
    """

if __name__ == '__main__':
    app.run(port=5000, debug=True)
