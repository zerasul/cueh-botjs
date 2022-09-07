FROM node:buster
COPY . /opt/cuehbot
WORKDIR /opt/cuehbot
RUN ["npm", "install"]
ENV DISCORD_TOKEN token
ENV DISCORD_CLIENT_ID clientID 
CMD ["npm", "run", "main"]