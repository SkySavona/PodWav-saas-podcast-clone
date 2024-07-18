import React from "react";
import { Button } from '@/components/ui/button';


const Home = () => {
  return (
    <div className="mt-0 flex flex-col gap-9">
      <section className="flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">Trending Podcasts</h1>
        <Button className="text-white-1 bg-blue-3">Button</Button>
      </section>
    </div>
  );
};

export default Home;
