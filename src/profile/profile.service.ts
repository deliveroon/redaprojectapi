/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { ProfileAnswer } from 'src/entity/profileAnswer';
import { ProfileQuestion } from 'src/entity/profileQuestion';
import { User } from 'src/entity/user.entity';
import { UserProfile } from 'src/entity/userProfile';
import { getRepository } from 'typeorm';

@Injectable()
export class ProfileService {

    async getQuestions() : Promise<any>{
        const questionRepository = getRepository(ProfileQuestion);
        const answerRepository = getRepository(ProfileAnswer);
        const questions = await questionRepository.find({
            order: {
                id: "ASC"
            }
        }) as any;

        for(let key in questions){
            const answers = await answerRepository.find({
                where: {
                    question: questions[key].id
                },
                order: {
                    id: "ASC"
                }
            });
            questions[key].answers = answers;
        }
        
        return questions;
    }

    async getProfile(username: string): Promise<UserProfile[]> {
        const userRepository = getRepository(User);  
        const profileRepository = getRepository(UserProfile);

        const user = await userRepository.findOne({
            where: {
                username: username
            }
        });

        if(!user){
            throw new NotFoundException()
        }        

        const profile = await profileRepository.find({
            where: {
                user: user
            },
            relations: ["question","answer"]
        });

        return profile;

    }

    async setProfile(username: string, body: any){
        const userRepository = getRepository(User);  
        const profileRepository = getRepository(UserProfile);

        const user = await userRepository.findOne({
            where: {
                username: username
            }
        });
        
        await profileRepository.delete({
            user: user
        });

        for (let key in body) {
            if(body[key] !== null) {
                let profile = new UserProfile();
                profile.user = user;
                profile.question = +key as any;
                profile.answer = body[key];
                await profileRepository.save(profile);
            }
        }
    }
}
