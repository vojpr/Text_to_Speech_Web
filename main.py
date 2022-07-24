from flask import Flask, render_template, request, send_from_directory
from io import BytesIO
import pyttsx3
from PyPDF2 import PdfReader
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')


@app.route("/", methods=['POST', 'GET'])
def home():
    error = None
    if request.method == 'POST':
        try:
            # Deletes previously created mp3 file
            current_directory = os.getcwd()
            files_in_dir = os.listdir()
            for file in files_in_dir:
                if file == "zpeechy.mp3":
                    os.remove(file)
            # Gets string from uploaded PDF
            pdf_file = request.files['file']
            bytes_file = BytesIO(pdf_file.read())
            pdf_string = ""
            reader = PdfReader(bytes_file)
            number_of_pages = len(reader.pages)
            for each in range(number_of_pages):
                page = reader.pages[each]
                pdf_string += page.extract_text()
            # Creates mp3 file from string
            engine = pyttsx3.init(driverName="espeak")
            engine.setProperty('rate', 155)
            engine.save_to_file(pdf_string, "zpeechy.mp3")
            engine.runAndWait()
            return send_from_directory(current_directory, "zpeechy.mp3", as_attachment=True)
        except:
            error = "Upload your PDF file first"
            return render_template("index.html", error=error)
    else:
        return render_template("index.html", error=error)


if __name__ == "__main__":
    app.run()
