import os
import glob

from PIL import Image

os.chdir(r'./static/img/home')
for file_name in glob.glob('*.jpg'):
    print(file_name)
    img = Image.open(file_name).convert('RGB')
    img.save(file_name, 'JPEG', quality=75, optimize=True, progressive=True)
print('转换成功')
