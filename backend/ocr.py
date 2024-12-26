from paddleocr import PaddleOCR
from PIL import Image, ImageDraw

ocr = PaddleOCR(use_angle_cls=True, lang='en')

def ocr_image(img_path):
    result = ocr.ocr(img_path, cls=True)
    recognized_text = ""
    for line in result:
        for word in line:
            text = word[1][0]
            recognized_text += text + " "
    return recognized_text

def highlight_text_in_image(tokens, doc_path, results):
    image = Image.open(doc_path)
    draw = ImageDraw.Draw(image)
    result = ocr.ocr(doc_path, cls=True)
    for line in result[0]:
        detected_word = line[1][0]
        for word in tokens:
            if detected_word.lower().find(word.lower()) != -1:
                results[get_highlighted_file_output_path(doc_path)].add(1)
                bbox = line[0]
                points = [int(coord) for xy_pair in bbox for coord in xy_pair]
                points = [(points[i], points[i + 1]) for i in range(0, len(points), 2)]
                draw.polygon(points, outline="red")
    image.save(get_highlighted_file_output_path(doc_path))

def get_highlighted_file_output_path(doc_path):
    return "highlighted_" + doc_path.split("/")[-1]
