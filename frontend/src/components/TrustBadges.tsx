import { Truck, ShieldCheck, RefreshCw, Headphones } from "lucide-react";

export default function TrustBadges() {
    const badges = [
        {
            icon: <Truck className="h-5 w-5 text-primary" />,
            title: "Free Shipping",
            description: "On orders over $100",
        },
        {
            icon: <RefreshCw className="h-5 w-5 text-primary" />,
            title: "Easy Returns",
            description: "30-day return policy",
        },
        {
            icon: <ShieldCheck className="h-5 w-5 text-primary" />,
            title: "Secure Payment",
            description: "100% secure checkout",
        },
        {
            icon: <Headphones className="h-5 w-5 text-primary" />,
            title: "24/7 Support",
            description: "Dedicated support",
        },
    ];

    return (
        <div className="grid grid-cols-2 gap-4 py-6 border-t border-b border-border my-8">
            {badges.map((badge, index) => (
                <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-0.5">{badge.icon}</div>
                    <div>
                        <h4 className="text-sm font-medium text-foreground">{badge.title}</h4>
                        <p className="text-xs text-muted-foreground">{badge.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
