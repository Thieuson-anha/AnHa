import { STATS } from "@/lib/data";

export default function StatsSection() {
  return (
    <section className="bg-navy-800 py-16">
      <div className="section-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl lg:text-5xl font-extrabold text-gold-400 mb-2">
                {stat.value}
              </p>
              <p className="text-white font-semibold mb-1">{stat.label}</p>
              {stat.description && (
                <p className="text-white/50 text-sm">{stat.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
