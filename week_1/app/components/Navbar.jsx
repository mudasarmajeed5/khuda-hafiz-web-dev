import Link from "next/link";
import { CiCloudSun } from "react-icons/ci";
import { FcTodoList } from "react-icons/fc";
import { AiOutlineCalculator } from "react-icons/ai";

const Navbar = () => {
  const Links = [
    {
      title: "TodoApp",
      link: "/todo",
      icon: <FcTodoList />,
    },
    {
      title: "Calculator",
      link: "/calculator",
      icon: <AiOutlineCalculator />,
    },
    {
      title: "WeatherApp",
      link: "/weather",
      icon: <CiCloudSun />,
    },
  ];

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-[var(--color-background)] shadow-md">
      <Link href="/" className="text-xl font-bold text-[var(--color-primary)]">
        MiniApps
      </Link>

      <ul className="flex gap-4">
        {Links.map((item, idx) => (
          <li key={idx}>
            <Link
              href={item.link}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-[var(--color-dark)] hover:bg-[var(--color-accent)] transition-colors duration-200"
            >
              <span className="text-lg">{item.icon}</span>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href="https://github.com/mudasarmajeed5"
        className="text-sm font-medium underline hover:underline-offset-4 text-[var(--color-dark)] hover:underline"
        target="_blank"
      >
        Follow me
      </Link>
    </nav>
  );
};

export default Navbar;
