#Written for HackGT 2015
#mp3 data stuff http://stackoverflow.com/questions/16634128/how-to-extract-the-raw-data-from-a-mp3-file-using-python
__author__ = 'NedTugent'

#PyDub https://github.com/jiaaro/pydub
from pydub import AudioSegment

AudioSegment.converter = "C:\\Users\\NedTugent\\Desktop\\BS\Vegas\\CONVERTINGSHIT\\ffmpeg-20140719-git-d5ee358-win64-static\\bin\\ffmpeg.exe"

sound = AudioSegment.from_mp3("Lords.mp3")

# sound._data is a bytestring
raw_data = sound._data

print raw_data
print "done"