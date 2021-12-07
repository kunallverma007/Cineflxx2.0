from socket import * 
serverPort = 3000
serverIP = "172.18.12.37"
serverSocket = socket(AF_INET,SOCK_DGRAM)
serverSocket.bind((serverIP,serverPort))
print("Server up and running on port",serverPort)
while(1):
	message,clientAddress=serverSocket.recvfrom(2048)
	print("Connection from",clientAddress)
    modifiedMessage = str(ord(message.decode()))
	serverSocket.sendto(modifiedMessage.encode(),clientAddress)