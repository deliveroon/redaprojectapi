import { Injectable } from '@nestjs/common';
import { Genre } from 'src/entity/genre.entity';
import { User } from 'src/entity/user.entity';
import { getRepository } from 'typeorm';
var CryptoJS = require('crypto-js');

@Injectable()
export class UserService {

    async getUser(username: string) : Promise<User>{
        const userRepository = getRepository(User);
        const user = await userRepository.findOne({
            select: ["id", "username", "password"],
            where: {
                username: username
            }
        });
        return user;
    }

    // Generate Sms Code
    generateSmsCode(){
        var smsCode = "";
        for(var i =0; i < 6; i++){          
            smsCode +=  Math.floor(Math.random() * (9 + 1)).toString();
        }
        return smsCode;
    }

    // Populate genre
    async populateGenre(user: User){
        // get repositories
        const genreRepository = getRepository(Genre);
        // get genre Id from name
        const genre = await genreRepository.findOne({
            name: user.genre.toString()
        });
        user.genre = genre;

        // get genreSearch Ids from names
        for(let key in user.genreSearch){
            const genre_tmp = await genreRepository.findOne({
                name: user.genreSearch[key].toString()
            });
            user.genreSearch[key] = genre_tmp;
        }
        return user;
    }

    // Verifier si un user est deja active
    async existPhone(phoneNumber: string){
        try {
            const userRepository = getRepository(User);
            const user = await userRepository.findOne({
                phoneNumber: phoneNumber,
                isActive: true
            });

            if(user){
                return {
                    status: 'success',
                    data: 1
                }
            }
            else {
                return {
                    status: 'success',
                    data: 0
                }
            }

        }
        catch (err){
            // catch and return error
            return {
                status: 'error',
                message: err.message,
                localisation: 'USER_EXIST_ERROR'
            }
        }
    }

    // Verifier si un user est deja active
    async exist(username: string){
        try {
            const userRepository = getRepository(User);
            const user = await userRepository.findOne({
                username: username,
                isActive: true
            });

            if(user){
                return {
                    status: 'success',
                    data: 1
                }
            }
            else {
                return {
                    status: 'success',
                    data: 0
                }
            }

        }
        catch (err){
            // catch and return error
            return {
                status: 'error',
                message: err.message,
                localisation: 'USER_EXIST_ERROR'
            }
        }
    }

    // Pre inscription avant validation via SMS
    async preInscription(body: User){
        try {
            // get repositories
            const userRepository = getRepository(User);

            await userRepository.delete({
                username: body.username,
                isActive: false
            });

            await userRepository.delete({
                username: body.username,
                isActive: false
            });

            // Format phone number
            body.phoneNumber = (body.phoneNumber as any).internationalNumber;

            await userRepository.delete({
                phoneNumber: body.phoneNumber,
                isActive: false
            });

            // generate random sms code
            body.smsCode = this.generateSmsCode();
            
            // Populate user genre
            body = await this.populateGenre(body);

            // Hash password 2nd time
            body.password = CryptoJS.SHA512(body.password).toString();
      
            // Save not activated user
            const user = await userRepository.save<User>(body);

            // Send sms with the code to the phoneNumber

            // Return success
            return {
                status: 'success',
                message: 'SMS envoyée'
            };
        }
        catch (err){
            // catch and return error
            return {
                status: 'error',
                message: err.message,
                localisation: 'PRE_INSCRIPTION_ERROR'
            }
        }
        
    }

    // Confirmation de l'inscription via code sms
    async validationInscription(body: User){
        try {
            // Format phone number
            body.phoneNumber = (body.phoneNumber as any).internationalNumber;
            // get repositories
            const userRepository = getRepository(User);
            const user = await userRepository.findOne({
                username: body.username,
                phoneNumber: body.phoneNumber,
                smsCode: body.smsCode
            });
            if(user) {
                // Set user to active
                await userRepository.update({
                    username: body.username,
                    phoneNumber: body.phoneNumber,
                    smsCode: body.smsCode
                },
                {
                    isActive: true
                });
                // Return success
                return {
                    status: 'success',
                    message: 'Confirmation OK',
                    data: 1
                };
            }
            else {
                return {
                    status: 'error',
                    message: 'Le code ne correspond pas veuillez réessayer',
                    data: 0,
                    localisation: 'VALIDATION_INSCRIPTION_ERROR'
                }
            }
        }
        catch (err) {
            // catch and return error
            return {
                status: 'error',
                message: err.message,
                localisation: 'VALIDATION_INSCRIPTION_ERROR'
            }
        }
    }
}
