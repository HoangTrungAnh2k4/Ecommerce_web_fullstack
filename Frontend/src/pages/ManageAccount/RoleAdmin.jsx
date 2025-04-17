import { Tabs } from 'antd';

import { getMonthlyStatsAPI } from '../../api/adminAPI';
import { useEffect, useState } from 'react';

function RoleAdmin() {
    const [listMonth, setListMonth] = useState([]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${month}/${year} `;
    };

    // return {
    //     label: `Tab ${id}`,
    //     key: id,
    //     children: `Content of Tab Pane ${id}`,
    //   };

    const onChange = (key) => {
        // console.log(key);
    };

    useEffect(() => {
        const getMonthlyStats = async () => {
            try {
                const res = await getMonthlyStatsAPI();
                console.log(res.data);

                if (res.data) {
                    const result = res.data.map((item) => {
                        return {
                            label: formatDate(item.date),
                            key: formatDate(item.date),
                            children: 'Content of Tab Pane ',
                        };
                    });
                    setListMonth(result);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getMonthlyStats();
    }, []);

    return (
        <div className="">
            <Tabs onChange={onChange} type="card" items={listMonth} />
        </div>
    );
}

export default RoleAdmin;
