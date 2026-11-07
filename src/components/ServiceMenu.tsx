import { SERVICES } from "../services/data";

export function ServicesMenu({ active }: { active?: boolean }) {
  return (
    <div className="nav-services">
      <a
        href="/services/"
        aria-haspopup="true"
        className={active ? "active" : undefined}
      >
        Services <span aria-hidden="true">▾</span>
      </a>
      <div className="nav-services-menu">
        {SERVICES.map((service) => (
          <a
            key={service.slug}
            href={`/services/${service.slug}/`}
            className="nav-services-item"
          >
            <strong>{service.title}</strong>
            <span>{service.headline}</span>
          </a>
        ))}
        <a href="/services/" className="nav-services-all">
          All services →
        </a>
      </div>
    </div>
  );
}
