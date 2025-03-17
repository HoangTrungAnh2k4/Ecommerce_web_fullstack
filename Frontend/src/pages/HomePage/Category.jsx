import cpu from '../../assets/images/category/cpu.png';
import vga from '../../assets/images/category/vga.png';
import main from '../../assets/images/category/main.png';
import acessory from '../../assets/images/category/acessory.png';
import laptop from '../../assets/images/category/laptop.png';
import ssd from '../../assets/images/category/ssd.png';
import monitor from '../../assets/images/category/monitor.png';
import pc from '../../assets/images/category/pc.png';

const categoryList = [
    { name: 'PC', image: pc, size: 'p-0' },
    { name: 'CPU', image: cpu, size: 'p-2' },
    { name: 'VGA', image: vga, size: 'p-1' },
    { name: 'Mainboard', image: main, size: 'p-1' },
    { name: 'Monitor', image: monitor, size: 'p-1' },
    { name: 'Laptop', image: laptop, size: 'p-1' },
    { name: 'Phụ kiện', image: acessory, size: 'p-3' },
    { name: 'SSD', image: ssd, size: 'p-3' },
];

function Category() {
    return (
        <ul className="mt-4 flex items-center justify-around rounded-md border bg-white p-4 shadow-md">
            {categoryList.map((category, index) => (
                <li
                    key={index}
                    className="cursor-pointer justify-items-center px-6 transition-all hover:-translate-y-2 hover:text-blue-500"
                >
                    <div className={`mb-2 flex h-[50px] justify-center ${category.size} `}>
                        <img src={category.image} alt="" className="h-full" />
                    </div>
                    <span className="">{category.name}</span>
                </li>
            ))}
        </ul>
    );
}

export default Category;
