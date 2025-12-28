# FROM BASE_IMAGE
FROM node:20-alpine

# RUN addgroup GROUP_NAME && adduser -S -G GROUP_NAME USER_NAME
RUN addgroup app && adduser -S -G app app

# USE USER_NAME
USER app

# WORKDIR /PATH/TO/WORKDIR
WORKDIR /app

# COPY SOURCE DESTINATION
COPY package*.json ./

# USER USER_NAME
USER root

# RUN COMMAND
RUN chown -R app:app .

# USE USER_NAME
USER app
    
# RUN COMMAND
RUN npm install

# COPY SOURCE DESTINATION
COPY . .

# EXPOSE PORT
EXPOSE 5173  

# CMD COMMAND
CMD npm run dev