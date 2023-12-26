# 많은 데이터를 데이터베이스에 한꺼번에 넣고싶을때 사용.
# 파이썬 확장프로그램 설치한 후에
# 아래 명령어 입력해서 두 라이브러리 설치후에 파이썬 실행

# pip install python-dotenv
# pip install mysql-connector-python
# python sampleDataAddBot.py 

import os
from dotenv import load_dotenv
import mysql.connector

# .env 파일 로드
load_dotenv()

# 환경 변수 불러오기
host = os.getenv('DB_HOST')
user = os.getenv('DB_USERNAME')
password = os.getenv('DB_PASSWORD')
database = os.getenv('DB_DATABASE')

# MySQL 연결 설정
# 본인 설정으로 바꿔서 사용
cnx = mysql.connector.connect(
    host=host,
    user=user,
    password=password,
    database=database
)
cursor = cnx.cursor()

# SQL 쿼리 생성 
# 주석 풀어서 쓰면 됨. (alt + shift + a)

# 공지사항
query = "INSERT INTO Notice (Notice_title, Notice_content, Notice_writer, Notice_image) VALUES "
for i in range(200):
    query += "('제목', '내용', '작성자', '이미지URL'),"

# 댓글
""" query = "INSERT INTO Comments (Users_uid, Boards_id, Comments_content, ParentCommentId) VALUES "
for i in range(100):
    query += "(1, 1, '댓글 내용', NULL)," """

# 게시물
""" query = "INSERT INTO Boards (Users_uid, Boards_title, Boards_content, Boards_views, createdAt, updatedAt) VALUES "
for i in range(100):
    query += "(1, '제목', '내용', 0, NOW(), NOW())," """

# 마지막 콤마 제거
query = query[:-1] + ";"

# SQL 쿼리 실행
cursor.execute(query)

# 변경사항 커밋
cnx.commit()

# 연결 종료
cursor.close()
cnx.close()

