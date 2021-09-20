/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import {getConnection} from "typeorm";


@Injectable()
export class MatchingService {

    async matchUsers(username: string) {

        const query = `SELECT us2.id,
        us2.username,
        SUM(mc.coefficient)/2 as matching_point
        FROM user us1, 
        user us2,
        user_genre_search_genre ugsg1,
        user_genre_search_genre ugsg2,
        user_profile up1,
        user_profile up2,
        matching_coeff mc
        WHERE us1.username = '${username}'
        AND us1.id != us2.id
        AND ugsg1.userId = us1.id
        AND ugsg2.userId = us2.id
        AND ugsg1.genreId = us2.genreId
        AND ugsg2.genreId = us1.genreId
        AND up1.userId = us1.id
        AND up2.userId = us2.id
        AND mc.firstAnswerId = up1.answerId
        AND mc.secondAnswerId = up2.answerId
        ORDER BY matching_point DESC`;

        const result = getConnection().query(query);
        return result;
    }
}
