import React from 'react';
import { getAllEditors } from '../../api/editors';
import { useSelector, useDispatch } from 'react-redux';
import { setEditors } from '../../api/state/actions';

export default function Editors() {
    const editors = useSelector(state => state.editors);
    const [isLoading, setIsLoading] = React.useState(true);
    const dispatch = useDispatch();

    getAllEditors(json => {
        if (isLoading) {
            setIsLoading(false);
            dispatch(setEditors(json));
        }
    });

    return (
        <div>
            {isLoading && <div>Loading...</div>}
            {!isLoading && <div>We are loaded!</div>}
        </div>
    );
}
