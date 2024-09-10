import  { createContext, useContext, useEffect } from 'react';
import { useState } from 'react';

const AwardContext = createContext({});

export const useAwardContext = () => {
    return useContext(AwardContext);
};


export const AwardProvider = ({ children }) => {
    const [awards, setAwards] = useState([]);

    const getUnachivedAwards = async () => {
        try {
            const response = await fetch('http://localhost:3000/awards/unachived', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                const data = await response.json();
                console.log('Awards retrieved successfully');
                return(data);
            } else {
                console.error('Failed to retrieve awards');
            }
        } catch (error) {
            console.error('Error retrieving awards:', error);
        }
    }

    const getAchivedAwards = async () => {
        try {
            const response = await fetch('http://localhost:3000/awards/achived', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                const data = await response.json();
                console.log('data:', data);
                console.log('Awards retrieved successfully');
                return(data);
            } else {
                console.error('Failed to retrieve awards');
            }
        } catch (error) {
            console.error('Error retrieving awards:', error);
        }
    };

    return (
        <AwardContext.Provider value={{ getUnachivedAwards, getAchivedAwards }}>
            {children}
        </AwardContext.Provider>
    );
}