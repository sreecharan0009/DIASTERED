import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const UserManagementPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState([]);

  const users = [
    {
      id: 1,
      name: "Priya Sharma",
      email: "priya.sharma@dps.edu.in",
      role: "student",
      institution: "Delhi Public School",
      lastActive: "2 hours ago",
      status: "active",
      joinDate: "15/08/2024",
      completedModules: 8,
      drillsParticipated: 12
    },
    {
      id: 2,
      name: "Dr. Rajesh Kumar",
      email: "rajesh.kumar@dps.edu.in",
      role: "staff",
      institution: "Delhi Public School",
      lastActive: "30 minutes ago",
      status: "active",
      joinDate: "10/07/2024",
      completedModules: 15,
      drillsParticipated: 25
    },
    {
      id: 3,
      name: "Anita Patel",
      email: "anita.patel@smc.edu.in",
      role: "admin",
      institution: "St. Mary\'s College",
      lastActive: "1 hour ago",
      status: "active",
      joinDate: "05/06/2024",
      completedModules: 20,
      drillsParticipated: 35
    },
    {
      id: 4,
      name: "Vikram Singh",
      email: "vikram.singh@mhs.edu.in",
      role: "student",
      institution: "Modern High School",
      lastActive: "5 hours ago",
      status: "inactive",
      joinDate: "20/09/2024",
      completedModules: 3,
      drillsParticipated: 5
    },
    {
      id: 5,
      name: "Prof. Sunita Gupta",
      email: "sunita.gupta@smc.edu.in",
      role: "staff",
      institution: "St. Mary\'s College",
      lastActive: "15 minutes ago",
      status: "active",
      joinDate: "12/05/2024",
      completedModules: 18,
      drillsParticipated: 30
    }
  ];

  const roleStats = {
    total: users?.length,
    students: users?.filter(u => u?.role === 'student')?.length,
    staff: users?.filter(u => u?.role === 'staff')?.length,
    admins: users?.filter(u => u?.role === 'admin')?.length,
    active: users?.filter(u => u?.status === 'active')?.length
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-error/10 text-error';
      case 'staff':
        return 'bg-warning/10 text-warning';
      case 'student':
        return 'bg-primary/10 text-primary';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'text-success' : 'text-muted-foreground';
  };

  const filteredUsers = users?.filter(user => {
    const matchesSearch = user?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         user?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         user?.institution?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesRole = selectedRole === 'all' || user?.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const handleUserSelect = (userId) => {
    setSelectedUsers(prev => 
      prev?.includes(userId) 
        ? prev?.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on users:`, selectedUsers);
    // Implement bulk actions here
    setSelectedUsers([]);
  };

  return (
    <div className="space-y-6">
      {/* User Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-card-foreground">{roleStats?.total}</div>
          <div className="text-sm text-muted-foreground">Total Users</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-primary">{roleStats?.students}</div>
          <div className="text-sm text-muted-foreground">Students</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-warning">{roleStats?.staff}</div>
          <div className="text-sm text-muted-foreground">Staff</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-error">{roleStats?.admins}</div>
          <div className="text-sm text-muted-foreground">Admins</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-success">{roleStats?.active}</div>
          <div className="text-sm text-muted-foreground">Active</div>
        </div>
      </div>
      {/* Search and Filters */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search users by name, email, or institution..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e?.target?.value)}
              className="px-3 py-2 border border-border rounded-lg bg-input text-foreground"
            >
              <option value="all">All Roles</option>
              <option value="student">Students</option>
              <option value="staff">Staff</option>
              <option value="admin">Admins</option>
            </select>
            <Button variant="outline">
              <Icon name="Filter" size={16} className="mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedUsers?.length > 0 && (
          <div className="flex items-center justify-between bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
            <span className="text-sm font-medium text-primary">
              {selectedUsers?.length} user{selectedUsers?.length !== 1 ? 's' : ''} selected
            </span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => handleBulkAction('activate')}>
                <Icon name="UserCheck" size={16} className="mr-2" />
                Activate
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleBulkAction('deactivate')}>
                <Icon name="UserX" size={16} className="mr-2" />
                Deactivate
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleBulkAction('export')}>
                <Icon name="Download" size={16} className="mr-2" />
                Export
              </Button>
            </div>
          </div>
        )}

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4">
                  <input
                    type="checkbox"
                    checked={selectedUsers?.length === filteredUsers?.length && filteredUsers?.length > 0}
                    onChange={(e) => {
                      if (e?.target?.checked) {
                        setSelectedUsers(filteredUsers?.map(u => u?.id));
                      } else {
                        setSelectedUsers([]);
                      }
                    }}
                    className="rounded border-border"
                  />
                </th>
                <th className="text-left py-3 px-4 font-medium text-card-foreground">User</th>
                <th className="text-left py-3 px-4 font-medium text-card-foreground">Role</th>
                <th className="text-left py-3 px-4 font-medium text-card-foreground">Institution</th>
                <th className="text-left py-3 px-4 font-medium text-card-foreground">Progress</th>
                <th className="text-left py-3 px-4 font-medium text-card-foreground">Last Active</th>
                <th className="text-left py-3 px-4 font-medium text-card-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers?.map((user) => (
                <tr key={user?.id} className="border-b border-border hover:bg-muted/50">
                  <td className="py-4 px-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers?.includes(user?.id)}
                      onChange={() => handleUserSelect(user?.id)}
                      className="rounded border-border"
                    />
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon name="User" size={20} color="var(--color-primary)" />
                      </div>
                      <div>
                        <div className="font-medium text-card-foreground">{user?.name}</div>
                        <div className="text-sm text-muted-foreground">{user?.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user?.role)}`}>
                      {user?.role}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm text-card-foreground">{user?.institution}</div>
                    <div className="text-xs text-muted-foreground">Joined {user?.joinDate}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm text-card-foreground">
                      {user?.completedModules} modules
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {user?.drillsParticipated} drills
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className={`flex items-center space-x-1 text-sm ${getStatusColor(user?.status)}`}>
                      <div className={`w-2 h-2 rounded-full ${user?.status === 'active' ? 'bg-success' : 'bg-muted-foreground'}`}></div>
                      <span>{user?.lastActive}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Icon name="Edit" size={16} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Icon name="MoreHorizontal" size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Users" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No users found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagementPanel;