import { useState } from "react";
import { useNavigate } from "react-router-dom";
// No other imports needed for a static landing page

interface Blog {
  _id: string;
  title: string;
  blog: string;
  author: string;
  profilePhoto: string;
  imagelink: string;
  upvote: number;
}

// A simple Navbar component for the landing page
const Navbar = () => {
  const nav = useNavigate();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex-shrink-0">
          <a href="/" className="text-3xl font-extrabold text-amber-700 hover:text-amber-900 transition-colors duration-300">
            Writely
          </a>
        </div>
        <div className="flex items-center space-x-6">
          <button
            onClick={() => nav("/blogs")}
            className="text-lg font-medium text-gray-700 hover:text-amber-700 transition-colors duration-300 hidden md:block"
          >
            Explore Blogs
          </button>
          <button
            onClick={() => nav("/login")}
            className="text-lg font-medium text-gray-700 hover:text-amber-700 transition-colors duration-300"
          >
            Log In
          </button>
          <button
            onClick={() => nav("/signup")}
            className="px-6 py-2 bg-amber-600 text-white font-semibold rounded-full hover:bg-amber-700 transition-transform transform hover:scale-105 shadow-lg"
          >
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
};

// A simple BlogCard component (assuming it's similar to your existing one, but simplified)
const BlogCard = ({ _id, title, blog, author, profilePhoto, imagelink, upvote }: Blog) => {
  const nav = useNavigate();
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col cursor-pointer"
         onClick={() => nav(`/blog/${_id}`)}>
      {imagelink && (
        <img
          src={imagelink}
          alt={title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{blog}</p>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center">
            <img
              src={profilePhoto}
              alt={author}
              className="w-8 h-8 rounded-full mr-2 object-cover"
            />
            <span className="text-gray-700 text-sm font-semibold">{author}</span>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <span>❤️ {upvote}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LandingPage = () => {
  const DUMMY_BLOGS: Blog[] = [
    {
      _id: "1",
      title: "Mastering Productivity in the Digital Age",
      blog: "Explore cutting-edge techniques and tools to boost your efficiency and reclaim your time in a world full of distractions. From Pomodoro to time blocking, find your rhythm.",
      author: "Eleanor Vance",
      profilePhoto: "https://randomuser.me/api/portraits/women/65.jpg",
      imagelink: "/blog3.jpg",
      upvote: 185,
    },
    {
      _id: "2",
      title: "The Silent Language of Cities: Urban Exploration",
      blog: "Dive into the hidden stories and overlooked beauty of urban landscapes. Discover street art, forgotten alleys, and the pulse of city life beyond the tourist guides.",
      author: "Julian Thorne",
      profilePhoto: "https://randomuser.me/api/portraits/men/52.jpg",
      imagelink: "/thrill.jpeg",
      upvote: 230,
    },
    {
      _id: "3",
      title: "Baking Bread at Home: A Beginner's Guide",
      blog: "Demystify the art of bread making with this comprehensive guide for beginners. Learn about ingredients, kneading techniques, and achieving that perfect crust.",
      author: "Chloe Dubois",
      profilePhoto: "https://randomuser.me/api/portraits/women/11.jpg",
      imagelink: "/download.jpeg",
      upvote: 150,
    },
    {
      _id: "4",
      title: "The Psychology of Color in Design",
      blog: "Understand how colors influence emotions and perceptions in design. Learn to harness their power to create impactful visuals and communicate effectively.",
      author: "Dr. Anya Sharma",
      profilePhoto: "https://randomuser.me/api/portraits/women/88.jpg",
      imagelink: "/batmanLogo.jpeg",
      upvote: 90,
    },
    {
      _id: "5",
      title: "Adventures in Sustainable Living",
      blog: "Embark on a journey towards a more eco-conscious lifestyle. This article shares practical tips for reducing your carbon footprint, from composting to eco-friendly fashion.",
      author: "Liam O'Connell",
      profilePhoto: "https://randomuser.me/api/portraits/men/29.jpg",
      imagelink: "/gpt.png",
      upvote: 195,
    },
    {
      _id: "6",
      title: "A Deep Dive into Quantum Computing Basics",
      blog: "Unravel the mysteries of quantum computing with this accessible introduction. Understand qubits, superposition, and entanglement without needing a physics degree.",
      author: "Professor Kim Lee",
      profilePhoto: "https://randomuser.me/api/portraits/men/71.jpg",
      imagelink: "/133792653533350168.jpg",
      upvote: 320,
    },
  ];

  const [blogs, setBlogs] = useState<Blog[]>(DUMMY_BLOGS);
  const [search, setSearch] = useState("");
  const nav = useNavigate();

  const handleSearch = () => {
    const results = DUMMY_BLOGS.filter(
      (blog) =>
        blog.title.toLowerCase().includes(search.toLowerCase()) ||
        blog.blog.toLowerCase().includes(search.toLowerCase()) ||
        blog.author.toLowerCase().includes(search.toLowerCase())
    );
    setBlogs(results);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] bg-gradient-to-br from-amber-700 to-purple-800 text-white flex items-center justify-center px-4 py-16 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="pattern-cubes" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M0 0h5v5H0zM5 5h5v5H5z" fill="rgba(255,255,255,0.1)"></path>
              </pattern>
            </defs>
            <rect x="0" y="0" width="100" height="100" fill="url(#pattern-cubes)"></rect>
          </svg>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight drop-shadow-md">
            Unleash Your Inner Writer. Discover Limitless Stories.
          </h1>
          <p className="text-xl md:text-2xl mb-10 opacity-90 font-light drop-shadow-sm">
            A vibrant community where ideas bloom and narratives come alive.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => nav("/signup")}
              className="px-10 py-4 bg-white text-amber-700 font-bold rounded-full text-lg shadow-2xl hover:bg-gray-100 transition-transform transform hover:scale-105 duration-300 ease-in-out"
            >
              Start Writing Now!
            </button>
            <button
              onClick={() => { /* Optionally scroll to blogs section */ }}
              className="px-10 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full text-lg shadow-lg hover:bg-white hover:text-amber-700 transition-colors duration-300 ease-in-out"
            >
              Explore Blogs
            </button>
          </div>
        </div>
      </div>

      {/* Search and Featured Blogs Section */}
      <div className="px-4 py-16 max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">Featured Stories</h2>

        <div className="flex flex-col sm:flex-row items-center justify-center mb-12 gap-6">
          <input
            type="text"
            placeholder="Search by title, content, or author..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              if (e.target.value === "") {
                setBlogs(DUMMY_BLOGS);
              }
            }}
            className="flex-grow max-w-3xl p-4 border border-gray-300 rounded-full shadow-inner focus:outline-none focus:ring-2 focus:ring-amber-500 text-lg"
          />
          <button
            onClick={handleSearch}
            className="px-8 py-4 bg-amber-600 text-white font-semibold rounded-full hover:bg-amber-700 transition-transform transform hover:scale-105 shadow-md text-lg"
          >
            Search
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {DUMMY_BLOGS.length > 0 ? (
            DUMMY_BLOGS.map((bl, index) => (
              <BlogCard
                _id={bl._id}
                key={index}
                title={bl.title}
                author={bl.author}
                blog={bl.blog}
                imagelink={bl.imagelink}
                profilePhoto={bl.profilePhoto}
                upvote={bl.upvote}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600 text-xl py-10">
              No articles found matching your search. Try a different keyword!
            </p>
          )}
        </div>
      </div>

      {/* Call to Action Section - Join Community */}
      <div className="bg-gradient-to-r from-blue-600 to-amber-700 text-white py-20 px-4 text-center mt-16 shadow-inner">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Connect. Create. Inspire.
          </h2>
          <p className="text-xl md:text-2xl mb-10 opacity-95 font-light">
            Become a part of our thriving community of writers and readers. Share your voice, get discovered, and engage with content you love.
          </p>
          <button
            onClick={() => nav("/signup")}
            className="bg-white text-amber-700 px-12 py-5 rounded-full text-xl font-bold hover:bg-gray-100 transition-transform transform hover:scale-105 duration-300 shadow-2xl"
          >
            Join Our Community
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:flex md:justify-between md:items-center">
          <p className="text-lg mb-4 md:mb-0">&copy; {new Date().getFullYear()} Blogosphere. All rights reserved.</p>
          <div className="space-x-6">
            <a href="#" className="hover:text-white transition-colors duration-200 text-md">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors duration-200 text-md">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors duration-200 text-md">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};