import React, { useState } from 'react';
import MsgInput from './MsgInput';
import MsgItem from './MagItem';

const userIds = ['park', 'kim'];

// userIds 배열의 인덱스를 한자리 수 랜덤하게 정하는 메서드로 고름
const getRandomUserId = () => userIds[Math.round(Math.random())];

// 빈 배열 50개에 fill(0)으로 아무 숫자나 넣고 map 돌려서 인덱스만 인자로 받아와서 배열 만듦
const originalMsgs = Array(50).fill(0).map((_, index) => ({
    id: 50 - index,
    userId: getRandomUserId(),
    // 밀리초 단위를 초로 바꾸고 그것을 분 단위로 바꿈 (결론: 분단위)
    timestamp: 1234567890123 + (50 - index) * 1000 * 60,
    text: `${50 - index} mock text`
}));

function MsgList() {
    const [msgs, setMsgs] = useState(originalMsgs);

    const onCreate = (text) => {
        const newMsg = {
            id: msgs.length + 1,
            userId: getRandomUserId(),
            timestamp: Date.now(),
            text: `${msgs.length + 1} ${text}`
        };

        // 이전 state를 파라미터로 받아서 복사하고 새로운 state도 추가해서 같이 업데이트
        setMsgs((msgs) => [newMsg, ...msgs]);
    }

    const onUpdate = (text, id) => {
        setMsgs(msgs => {
            // state에서 수정하고자 하는 메세지의 id와 일치하는 항목을 찾음
            const targetIndex = msgs.findIndex(msg => msg.id === id);
            
            // 찾고자 하는 index가 -1일 경우는 항목이 없는 경우
            // 그런 경우에는 기존 state 리턴
            if (targetIndex < 0) return msgs;

            // 기존 state를 복사해 새로운 배열을 만듦 (직접적으로 state를 수정하면 안되기 때문)
            const newMsgs = [...msgs];

            // 기존 state를 복사 시킨 새로운 배열의 id가 일치하는 index의 메세지는 잘라내고
            // 기존 state에서 메세지를 복사한 뒤 새로운 텍스트로 수정하고 수정된 메세지를 새로운 배열에 넣고 기존 state에 덮어 씌움
            newMsgs.splice(targetIndex, 1, {
                ...msgs[targetIndex],
                text
            });
            return newMsgs;
        });
    }

    return (
        <>  
            <MsgInput />
            <ul className="messages">
                {msgs.map((item) => (
                    <MsgItem 
                        key={item.id}
                        userId={item.userId}
                        timestamp={item.timestamp} 
                        text={item.text} 
                        onUpdate={onUpdate} 
                    />
                ))}
            </ul>
        </>
    );
}

export default MsgList;