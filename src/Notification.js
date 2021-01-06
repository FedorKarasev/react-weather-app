import React from 'react';

export default function Notification(geolocationPromlem) {

    let cls = ['notification'];

    if (geolocationPromlem.geolocationPromlem) {
        cls.push('block');
    } else {

    }
    return (
        <div class={cls.join(' ')}>
            Ваш браузер не поддерживает геолокацию.
        </div>
    )
}