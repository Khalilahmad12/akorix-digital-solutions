import React from 'react';
import {
  Code2,
  Globe,
  Smartphone,
  Palette,
  PenTool,
  Video,
  Megaphone,
  Search,
  ShoppingCart,
  ShoppingBag,
  Bot,
  Sparkles,
  Zap,
  ShieldCheck,
  TrendingUp,
  Users,
  Layers,
  Database,
  CheckCircle2,
  ArrowRight,
  CreditCard,
  Mail,
  Clock,
  Briefcase
} from 'lucide-react';

interface ServiceIconProps {
  name: string;
  className?: string;
}

export const ServiceIcon: React.FC<ServiceIconProps> = ({ name, className = 'w-5 h-5' }) => {
  switch (name) {
    case 'Code2':
      return <Code2 className={className} />;
    case 'Globe':
      return <Globe className={className} />;
    case 'Smartphone':
      return <Smartphone className={className} />;
    case 'Palette':
      return <Palette className={className} />;
    case 'PenTool':
      return <PenTool className={className} />;
    case 'Video':
      return <Video className={className} />;
    case 'Megaphone':
      return <Megaphone className={className} />;
    case 'Search':
      return <Search className={className} />;
    case 'ShoppingCart':
      return <ShoppingCart className={className} />;
    case 'ShoppingBag':
      return <ShoppingBag className={className} />;
    case 'Bot':
      return <Bot className={className} />;
    case 'Zap':
      return <Zap className={className} />;
    case 'ShieldCheck':
      return <ShieldCheck className={className} />;
    case 'TrendingUp':
      return <TrendingUp className={className} />;
    case 'Users':
      return <Users className={className} />;
    case 'Layers':
      return <Layers className={className} />;
    case 'Database':
      return <Database className={className} />;
    case 'CheckCircle2':
      return <CheckCircle2 className={className} />;
    case 'ArrowRight':
      return <ArrowRight className={className} />;
    case 'CreditCard':
      return <CreditCard className={className} />;
    case 'Mail':
      return <Mail className={className} />;
    case 'Clock':
      return <Clock className={className} />;
    case 'Briefcase':
      return <Briefcase className={className} />;
    default:
      return <Sparkles className={className} />;
  }
};
