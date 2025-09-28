import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, X, TrendingUp } from 'lucide-react';

interface SearchFiltersProps {
  onSearch: (filters: SearchFilters) => void;
}

export interface SearchFilters {
  query: string;
  university: string;
  minCgpa: number;
  skills: string[];
  status: string;
  graduationYear: string;
}

const universities = [
  'SRM Institute of Science and Technology',
  'VIT University Chennai',
  'Anna University',
  'Sathyabama Institute of Science and Technology'
];

const popularSkills = [
  'React', 'Python', 'JavaScript', 'Node.js', 'Java', 'Machine Learning',
  'MongoDB', 'AWS', 'Docker', 'TypeScript', 'Spring Boot', 'TensorFlow'
];

const statusOptions = [
  { value: 'all', label: 'All Students' },
  { value: 'available', label: 'Available' },
  { value: 'interviewing', label: 'Interviewing' },
  { value: 'hired', label: 'Hired' }
];

export function SearchFilters({ onSearch }: SearchFiltersProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    university: '',
    minCgpa: 0,
    skills: [],
    status: 'all',
    graduationYear: ''
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onSearch(newFilters);
  };

  const handleSkillToggle = (skill: string) => {
    const newSkills = filters.skills.includes(skill)
      ? filters.skills.filter(s => s !== skill)
      : [...filters.skills, skill];
    handleFilterChange('skills', newSkills);
  };

  const clearAllFilters = () => {
    const emptyFilters: SearchFilters = {
      query: '',
      university: '',
      minCgpa: 0,
      skills: [],
      status: 'all',
      graduationYear: ''
    };
    setFilters(emptyFilters);
    onSearch(emptyFilters);
  };

  return (
    <Card className="glass-card border-border/50 animate-slide-up">
      <div className="gradient-border">
        <div className="bg-card rounded-lg">
          <CardContent className="p-6 space-y-6">
            {/* Main Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search students by name, skills, or interests..."
                value={filters.query}
                onChange={(e) => handleFilterChange('query', e.target.value)}
                className="pl-10 bg-background/50 border-border/50 focus:border-primary transition-all"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm font-medium text-muted-foreground">Quick filters:</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="gap-2 hover:bg-primary/10"
              >
                <Filter className="w-4 h-4" />
                Advanced
              </Button>
              
              {/* Status Filter */}
              <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
                <SelectTrigger className="w-auto">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Clear Filters */}
              {(filters.query || filters.university || filters.skills.length > 0 || filters.status !== 'all') && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="gap-2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                  Clear all
                </Button>
              )}
            </div>

            {/* Advanced Filters */}
            {showAdvanced && (
              <div className="space-y-4 p-4 bg-card-glass rounded-lg animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* University Filter */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">University</label>
                    <Select value={filters.university} onValueChange={(value) => handleFilterChange('university', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select university" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Universities</SelectItem>
                        {universities.map((uni) => (
                          <SelectItem key={uni} value={uni}>
                            {uni}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* CGPA Filter */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Minimum CGPA</label>
                    <Select 
                      value={filters.minCgpa.toString()} 
                      onValueChange={(value) => handleFilterChange('minCgpa', parseFloat(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select minimum CGPA" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Any CGPA</SelectItem>
                        <SelectItem value="7">7.0+</SelectItem>
                        <SelectItem value="7.5">7.5+</SelectItem>
                        <SelectItem value="8">8.0+</SelectItem>
                        <SelectItem value="8.5">8.5+</SelectItem>
                        <SelectItem value="9">9.0+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Graduation Year */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Graduation Year</label>
                    <Select value={filters.graduationYear} onValueChange={(value) => handleFilterChange('graduationYear', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any Year</SelectItem>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2025">2025</SelectItem>
                        <SelectItem value="2026">2026</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Skills Filter */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <label className="text-sm font-medium">Skills</label>
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted-foreground">Popular skills</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {popularSkills.map((skill) => (
                      <Badge
                        key={skill}
                        variant={filters.skills.includes(skill) ? "default" : "outline"}
                        className={`cursor-pointer transition-all hover-lift ${
                          filters.skills.includes(skill)
                            ? 'bg-primary text-primary-foreground shadow-glow'
                            : 'hover:bg-primary/10 border-primary/30'
                        }`}
                        onClick={() => handleSkillToggle(skill)}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Active Filters Display */}
            {(filters.skills.length > 0 || filters.university || filters.minCgpa > 0) && (
              <div className="flex flex-wrap gap-2 pt-2 border-t border-border/50">
                <span className="text-sm text-muted-foreground">Applied filters:</span>
                {filters.university && (
                  <Badge variant="secondary" className="gap-1">
                    {filters.university}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => handleFilterChange('university', '')}
                    />
                  </Badge>
                )}
                {filters.minCgpa > 0 && (
                  <Badge variant="secondary" className="gap-1">
                    CGPA {filters.minCgpa}+
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => handleFilterChange('minCgpa', 0)}
                    />
                  </Badge>
                )}
                {filters.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="gap-1">
                    {skill}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => handleSkillToggle(skill)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </div>
      </div>
    </Card>
  );
}