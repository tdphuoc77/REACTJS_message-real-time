import React, { useState } from "react"
import { db } from "../FireBase/Config"

const useFireStore = (collection, condition) => {

    const [documents, setDocuments] = useState([]);

    React.useEffect(() => {
        let collectionRef = db.collection(collection).orderBy('createAt');

        // condition
        /**
         * {
         * fieldName:'abc',
         * operator:'==',
         * compareValue:'abc',
         * }
         */
        if (condition) {

            if (!condition.compareValue || !condition.compareValue.length) {
                return;
            }
            collectionRef = collectionRef.where(condition.fieldName, condition.operator, condition.compareValue)
        }


        const unsubscibed = collectionRef.onSnapshot((snapshot) => {
            const d = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id,
            }))
            setDocuments(d)
        });

        return unsubscibed;

    }, [collection, condition]);

    return documents;
};

export default useFireStore;